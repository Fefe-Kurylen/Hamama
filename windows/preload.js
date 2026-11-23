const { contextBridge, ipcRenderer } = require('electron');
const I = (ch) => (...a) => ipcRenderer.invoke(ch, ...a);
contextBridge.exposeInMainWorld('native', {
  acc: { list: I('acc:list'), detect: I('acc:detect'), test: I('acc:test'), add: I('acc:add'), update: I('acc:update'), remove: I('acc:remove'), oauth: I('acc:oauth') },
  mail: {
    folders: I('mail:folders'), cached: I('mail:cached'), list: I('mail:list'), unified: I('mail:unified'), search: I('mail:search'), searchAll: I('mail:searchAll'),
    get: I('mail:get'), source: I('mail:source'), flags: I('mail:flags'), move: I('mail:move'), role: I('mail:role'), destroy: I('mail:destroy'),
    empty: I('mail:empty'), allRead: I('mail:allread'), mkdir: I('mail:mkdir'), rename: I('mail:rename'), rmdir: I('mail:rmdir'), send: I('mail:send'), draft: I('mail:draft')
  },
  att: { save: I('att:save'), open: I('att:open') },
  block: { list: I('block:list'), add: I('block:add'), remove: I('block:remove') },
  pickFiles: I('file:pick'),
  prefs: I('prefs'),
  notify: I('notify'),
  badge: I('badge'),
  defaultMail: I('default-mail'),
  print: I('print'),
  version: I('app-version'),
  on: (ch, cb) => { if (['new-mail', 'mailto', 'open-key', 'compose-send', 'compose-close'].includes(ch)) ipcRenderer.on(ch, (e, d) => cb(d)); },
  composeWin: { open: I('compose:open'), init: I('compose:init'), send: I('compose:send'), done: I('compose:done'), title: I('compose:title') },
  setTitleBar: o => ipcRenderer.send('titlebar', o),
  ready: () => ipcRenderer.send('ready'),
  platform: process.platform
});
