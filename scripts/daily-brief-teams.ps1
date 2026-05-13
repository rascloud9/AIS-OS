# Daily Brief → Teams
# Runs the AIS-OS daily-brief skill and posts output to a Teams channel via webhook.

$ErrorActionPreference = "Continue"
$workspace = "C:\Users\rsnide\OneDrive - Revolution Group\VS Workspace\AIS-OS"
$claude   = "C:\Users\rsnide\AppData\Roaming\npm\claude.cmd"
$webhook  = "https://revgroup.webhook.office.com/webhookb2/8ac3ac4f-1f08-4d0c-8cc0-4b317431be0e@c10690e9-3a2f-428b-8e80-23a4875539e2/IncomingWebhook/ca3376362dab46fe9fd32a2d511f5646/c8b97233-2746-4477-9827-3279bb1b5968/V22EtCGjRTS1HlPwAHM1AsYEwYY-niq2K3A96wXJ3OF_Y1"

Set-Location $workspace

# Run the brief (5-minute timeout)
$output = & $claude --print -p "Run /daily-brief" 2>&1
$text   = ($output -join "`n").Trim()

if (-not $text) {
    $text = "Daily brief ran but returned no output. Check Claude auth or skill config."
}

# Teams MessageCard payload (supports preformatted text)
$payload = @{
    "@type"    = "MessageCard"
    "@context" = "http://schema.org/extensions"
    "summary"  = "Daily Brief"
    "sections" = @(
        @{
            "text" = "<pre>$([System.Web.HttpUtility]::HtmlEncode($text))</pre>"
        }
    )
} | ConvertTo-Json -Depth 10

try {
    Invoke-RestMethod -Uri $webhook -Method Post -ContentType "application/json" -Body $payload
    Write-Host "Brief posted to Teams successfully."
} catch {
    Write-Host "Failed to post to Teams: $_"
}
