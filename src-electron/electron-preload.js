import { contextBridge } from 'electron'
import { BrowserWindow } from '@electron/remote'
import { defined } from './utils/constants/constants'

contextBridge.exposeInMainWorld(defined.EVENT_BRIDGE_CONTEXT, {
  minimize () {
    BrowserWindow.getFocusedWindow().minimize()
  },

  toggleMaximize () {
    const win = BrowserWindow.getFocusedWindow()

    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  },

  close () {
    BrowserWindow.getFocusedWindow().close()
  }
})
