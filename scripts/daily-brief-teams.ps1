# Daily Brief → Teams
# Runs the AIS-OS daily-brief skill and posts output to a Teams channel via webhook.

$ErrorActionPreference = "Continue"
$workspace = "C:\Users\rsnide\OneDrive - Revolution Group\VS Workspace\AIS-OS"
$claude   = "C:\Users\rsnide\AppData\Roaming\npm\claude.cmd"
$webhook  = "https://revgroup.webhook.office.com/webhookb2/8ac3ac4f-1f08-4d0c-8cc0-4b317431be0e@c10690e9-3a2f-428b-8e80-23a4875539e2/IncomingWebhook/ca3376362dab46fe9fd32a2d511f5646/c8b97233-2746-4477-9827-3279bb1b5968/V22EtCGjRTS1HlPwAHM1AsYEwYY-niq2K3A96wXJ3OF_Y1"

Set-Location $workspace

# Claude outputs UTF-8; PowerShell 5.1 defaults to the OEM code page (CP437)
# which corrupts multi-byte chars (e.g. — becomes ΓÇö). Force UTF-8 decode.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Run the brief (5-minute timeout)
$output = & $claude --print -p "Run /daily-brief" 2>&1
$text   = ($output -join "`n").Trim()

if (-not $text) {
    $text = "Daily brief ran but returned no output. Check Claude auth or skill config."
}

function ConvertTableToHtml {
    param([string[]]$tableLines)
    $html = '<table>'
    $isHeader = $true
    foreach ($line in $tableLines) {
        if ($line -match '^[\-\s]+$') { $isHeader = $false; continue }
        $cells = ($line -split '\s{2,}') | Where-Object { $_.Trim() -ne '' }
        if ($cells.Count -eq 0) { continue }
        $tag = if ($isHeader) { 'th' } else { 'td' }
        $html += '<tr>' + (($cells | ForEach-Object { "<$tag>" + $_.Trim() + "</$tag>" }) -join '') + '</tr>'
        $isHeader = $false
    }
    return $html + '</table>'
}

function ConvertTo-TeamsHtml {
    param([string]$md)

    # Strip code fences
    $md = $md -replace '(?m)^```[^\n]*$', ''

    # Convert space-aligned tables (detected by a separator line of --- --- ---)
    $lines  = $md -split '\r?\n'
    $result = [System.Collections.Generic.List[string]]::new()
    $buf    = [System.Collections.Generic.List[string]]::new()
    $inTbl  = $false

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line    = $lines[$i]
        $nextSep = ($i + 1 -lt $lines.Count) -and ($lines[$i+1] -match '^[\-\s]{4,}$') -and ($lines[$i+1] -match '-{3}')

        if ($nextSep -and -not $inTbl) {
            $inTbl = $true
            $buf.Clear()
            $buf.Add($line)
        } elseif ($inTbl) {
            if ($line.Trim() -eq '') {
                $result.Add((ConvertTableToHtml -tableLines $buf))
                $inTbl = $false
                $result.Add('')
            } else {
                $buf.Add($line)
            }
        } else {
            $result.Add($line)
        }
    }
    if ($inTbl -and $buf.Count -gt 0) { $result.Add((ConvertTableToHtml -tableLines $buf)) }

    $md = $result -join "`n"

    # Horizontal rules
    $md = $md -replace '(?m)^---+$', '<br/>'

    # H1 → bold + underline
    $md = $md -replace '(?m)^# (.+)$', '<b><u>$1</u></b>'

    # H2 → bold
    $md = $md -replace '(?m)^## (.+)$', '<b>$1</b>'

    # H3 → bold
    $md = $md -replace '(?m)^### (.+)$', '<b>$1</b>'

    # Inline bold
    $md = $md -replace '\*\*(.+?)\*\*', '<b>$1</b>'

    # Newlines → <br>
    $md = $md -replace '\r?\n', '<br/>'

    return $md.Trim()
}

$html = ConvertTo-TeamsHtml -md $text

$payload = @{
    "@type"      = "MessageCard"
    "@context"   = "http://schema.org/extensions"
    "themeColor" = "0076D7"
    "summary"    = "Daily Brief"
    "text"       = $html
} | ConvertTo-Json -Depth 10

# ConvertTo-Json escapes non-ASCII as \uXXXX — decode them back before sending
$payload = [regex]::Replace($payload, '\\u([0-9a-fA-F]{4})', {
    [char][int]("0x" + $args[0].Groups[1].Value)
})

# Send as explicit UTF-8 bytes so Teams receives the characters correctly
$bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
try {
    Invoke-RestMethod -Uri $webhook -Method Post -ContentType "application/json; charset=utf-8" -Body $bytes
    Write-Host "Brief posted to Teams successfully."
} catch {
    Write-Host "Failed to post to Teams: $_"
}
