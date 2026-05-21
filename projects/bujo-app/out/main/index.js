"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
const TODOS_PATH = path.join(__dirname, "../../../todos/todos.md");
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#18181b",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  if (process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  electron.ipcMain.handle("todos:read", () => {
    try {
      return fs.readFileSync(TODOS_PATH, "utf-8");
    } catch (e) {
      console.error("Failed to read todos.md:", e.message);
      return null;
    }
  });
  electron.ipcMain.handle("todos:write", (_, content) => {
    try {
      fs.writeFileSync(TODOS_PATH, content, "utf-8");
      return true;
    } catch (e) {
      console.error("Failed to write todos.md:", e.message);
      return false;
    }
  });
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
