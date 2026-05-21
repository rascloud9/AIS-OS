"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  readTodos: () => electron.ipcRenderer.invoke("todos:read"),
  writeTodos: (content) => electron.ipcRenderer.invoke("todos:write", content)
});
