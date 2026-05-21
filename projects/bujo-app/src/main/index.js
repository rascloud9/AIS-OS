import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'

// __dirname = out/main/ at runtime; walk up 3 levels to reach projects/
const TODOS_PATH = join(__dirname, '../../../todos/todos.md')

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#18181b',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  ipcMain.handle('todos:read', () => {
    try {
      return readFileSync(TODOS_PATH, 'utf-8')
    } catch (e) {
      console.error('Failed to read todos.md:', e.message)
      return null
    }
  })

  ipcMain.handle('todos:write', (_, content) => {
    try {
      writeFileSync(TODOS_PATH, content, 'utf-8')
      return true
    } catch (e) {
      console.error('Failed to write todos.md:', e.message)
      return false
    }
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
