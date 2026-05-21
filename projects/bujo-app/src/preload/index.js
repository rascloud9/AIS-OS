import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  readTodos: () => ipcRenderer.invoke('todos:read'),
  writeTodos: (content) => ipcRenderer.invoke('todos:write', content)
})
