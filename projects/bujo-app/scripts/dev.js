const { spawn } = require('child_process')
const path = require('path')

const env = { ...process.env }
delete env.ELECTRON_RUN_AS_NODE

const cli = path.join(__dirname, '../node_modules/electron-vite/bin/electron-vite.js')
const proc = spawn(process.execPath, [cli, 'dev'], { stdio: 'inherit', env })
proc.on('exit', code => process.exit(code ?? 0))
