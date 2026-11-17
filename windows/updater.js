'use strict';
/* ============================================================
   Hamama — mises à jour sans réinstaller
   • Version « Installation » : téléchargement en arrière-plan depuis GitHub Releases
     (Fefe-Kurylen/Hamama), puis bouton « Redémarrer pour mettre à jour ».
     Mises à jour différentielles (seuls les morceaux modifiés sont téléchargés).
   • Version « Portable » : signale la nouvelle version (lien de téléchargement).
   • Version Microsoft Store : rien à faire, le Store met l’appli à jour tout seul.
   ============================================================ */
const { app, shell } = require('electron');

let send = () => {}, au = null, state = { state: 'idle' }, timer = null, last = 0;
const RELEASES = 'https://github.com/Fefe-Kurylen/Hamama/releases/latest';
const portable = () => !!process.env.PORTABLE_EXECUTABLE_DIR;
const mode = () => process.windowsStore ? 'store' : process.mas ? 'store' : !app.isPackaged ? 'dev' : portable() ? 'portable' : 'auto';
const set = s => { state = { ...s, mode: mode(), version: app.getVersion() }; send('update', state); };

function init(emit) {
  send = emit;
  if (mode() === 'store' || mode() === 'dev') { set({ state: 'off' }); return; }
  try { au = require('electron-updater').autoUpdater; } catch { set({ state: 'off' }); return; }
  au.autoDownload = !portable();
  au.autoInstallOnAppQuit = !portable();
  au.allowPrerelease = false;
  au.logger = null;
  au.on('checking-for-update', () => set({ state: 'checking' }));
  au.on('update-not-available', () => set({ state: 'uptodate' }));
  au.on('update-available', i => set({ state: portable() ? 'available' : 'downloading', next: i.version, percent: 0 }));
  au.on('download-progress', p => set({ state: 'downloading', next: state.next, percent: Math.round(p.percent || 0) }));
  au.on('update-downloaded', i => set({ state: 'ready', next: i.version }));
  au.on('error', e => set({ state: 'error', err: String(e && e.message || e).split('\n')[0].slice(0, 200) }));
  setTimeout(check, 15000);                        // au démarrage (sans ralentir l’ouverture)
  timer = setInterval(check, 30 * 60e3);           // puis toutes les 30 minutes
}
async function check() {
  if (!au) return state;
  if (state.state === 'downloading' || state.state === 'ready') return state;
  last = Date.now();
  try { await au.checkForUpdates(); } catch (e) { set({ state: 'error', err: String(e && e.message || e).split('\n')[0].slice(0, 200) }); }
  return state;
}
function install() {
  if (portable() || state.state === 'available') { shell.openExternal(RELEASES); return false; }
  if (!au || state.state !== 'ready') return false;
  setImmediate(() => au.quitAndInstall(true, true));   // installation silencieuse puis relance
  return true;
}
/** Quand on revient sur la fenêtre : nouvelle vérification si la dernière date de plus de 10 min */
function onFocus() { if (au && Date.now() - last > 10 * 60e3) check(); }
module.exports = { init, check, install, onFocus, get: () => state };
