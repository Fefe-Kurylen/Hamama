/* ============================================================
   Hamama — pont entre l'interface et iPhone / Android (Capacitor)
   Définit window.native (même API que l'appli Windows) :
   les appels partent vers le moteur mail Node.js embarqué (plugin Nodejs).
   ============================================================ */
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins, plat = C.getPlatform(), NJ = P.Nodejs;

  var b64 = function (u8) { var s = ''; for (var i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  var enc = function (v) {
    if (v instanceof Uint8Array) return { __b64: b64(v) };
    if (v instanceof ArrayBuffer) return { __b64: b64(new Uint8Array(v)) };
    if (Array.isArray(v)) return v.map(enc);
    if (v && typeof v === 'object') { var o = {}; for (var k in v) o[k] = enc(v[k]); return o; }
    return v;
  };
  var safeName = function (n) { return String(n || 'fichier').replace(/[\\/:*?"<>|]/g, '_'); };

  /* ---- Moteur Node.js : appels avec réponse + événements ---- */
  var seq = 0, wait = {}, listeners = {}, ready = false, readyQ = [];
  var setReady = function () { if (ready) return; ready = true; readyQ.splice(0).forEach(function (f) { f(); }); };
  NJ.addListener('message', function (ev) {
    var a = (ev && ev.args) || [];
    if (ev.eventName === 'reply') { var w = wait[a[0]]; if (w) { delete wait[a[0]]; if (a[1]) w.res(a[2]); else w.rej(new Error(a[2])); } }
    else if (ev.eventName === 'event') (listeners[a[0]] || []).forEach(function (cb) { try { cb(a[1]); } catch (e) { console.error(e); } });
  });
  NJ.addListener('ready', setReady);
  NJ.isReady().then(function (r) { if (r && r.ready) setReady(); }).catch(function () {});
  var whenReady = function () { return ready ? Promise.resolve() : new Promise(function (r) { readyQ.push(r); }); };
  var call = function (ch) {
    var args = [].slice.call(arguments, 1);
    return whenReady().then(function () {
      return new Promise(function (res, rej) {
        var id = ++seq; wait[id] = { res: res, rej: rej };
        NJ.send({ eventName: 'call', args: [id, ch, enc(args)] }).catch(function (e) { delete wait[id]; rej(e); });
      });
    });
  };
  var I = function (ch) { return function () { return call.apply(null, [ch].concat([].slice.call(arguments))); }; };

  /* ---- Pièces jointes : fichier temporaire + feuille de partage du système ---- */
  var shareAtts = async function (keys) {
    var uris = [], name = '';
    for (var i = 0; i < keys.length; i++) {
      var a = await call('att:get', keys[i]); if (!a) continue;
      name = safeName(a.filename);
      var r = await P.Filesystem.writeFile({ path: 'pj/' + Date.now() + '-' + name, data: a.data, directory: 'CACHE', recursive: true });
      uris.push(r.uri);
    }
    if (!uris.length) throw new Error('Pièce jointe expirée : rouvre le message.');
    try { await P.Share.share({ title: name, files: uris }); }
    catch (e) { if (/cancel|annul/i.test(String((e && e.message) || e))) return null; throw e; }
    return name;
  };

  /* ---- Choix de fichiers (joindre) ---- */
  var pickFiles = function () {
    return new Promise(function (res, rej) {
      var inp = document.createElement('input'); inp.type = 'file'; inp.multiple = true; inp.style.display = 'none';
      document.body.appendChild(inp);
      var done = false, finish = function (v) { if (done) return; done = true; inp.remove(); res(v); };
      inp.addEventListener('cancel', function () { finish([]); });
      inp.onchange = async function () {
        try {
          var out = [];
          for (var i = 0; i < inp.files.length; i++) {
            var f = inp.files[i];
            if (f.size > 35 * 1048576) { done = true; inp.remove(); return rej(new Error('« ' + f.name + ' » dépasse 35 Mo')); }
            out.push({ name: f.name, size: f.size, type: f.type, data: new Uint8Array(await f.arrayBuffer()) });
          }
          finish(out);
        } catch (e) { done = true; inp.remove(); rej(e); }
      };
      inp.click();
    });
  };

  /* ---- Notifications locales ---- */
  var notifId = 1, notifOk = null;
  var notify = async function (o) {
    var prefs = JSON.parse(localStorage.getItem('hamama-prefs') || '{}');
    if (prefs.notify === false) return false;
    if (notifOk === null) { try { var p = await P.LocalNotifications.requestPermissions(); notifOk = p.display === 'granted'; } catch (e) { notifOk = false; } }
    if (!notifOk) return false;
    await P.LocalNotifications.schedule({ notifications: [{ id: (notifId++ % 100000) + 1, title: String(o.title || 'Hamama').slice(0, 120), body: String(o.body || '').slice(0, 240), extra: { key: o.key || '' } }] });
    return true;
  };
  try { P.LocalNotifications.addListener('localNotificationActionPerformed', function (e) { var k = e && e.notification && e.notification.extra && e.notification.extra.key; if (k) (listeners['open-key'] || []).forEach(function (cb) { cb(k); }); }); } catch (e) {}

  /* ---- Bouton retour Android, retour au premier plan ---- */
  try {
    P.App.addListener('backButton', function () {
      var ev = new CustomEvent('hamama-back', { cancelable: true });
      if (window.dispatchEvent(ev)) P.App.minimizeApp();
    });
    P.App.addListener('resume', function () { window.dispatchEvent(new Event('focus')); });
    P.App.addListener('appUrlOpen', function (e) { if (e && /^mailto:/i.test(e.url)) (listeners['mailto'] || []).forEach(function (cb) { cb(e.url); }); });
  } catch (e) {}

  window.native = {
    platform: plat,
    acc: { list: I('acc:list'), detect: I('acc:detect'), test: I('acc:test'), add: I('acc:add'), update: I('acc:update'), remove: I('acc:remove'), oauth: I('acc:oauth') },
    mail: {
      folders: I('mail:folders'), cached: I('mail:cached'), list: I('mail:list'), unified: I('mail:unified'), search: I('mail:search'), searchAll: I('mail:searchAll'),
      get: I('mail:get'), source: I('mail:source'), flags: I('mail:flags'), move: I('mail:move'), role: I('mail:role'), destroy: I('mail:destroy'),
      empty: I('mail:empty'), allRead: I('mail:allread'), mkdir: I('mail:mkdir'), rename: I('mail:rename'), rmdir: I('mail:rmdir'), send: I('mail:send'), draft: I('mail:draft')
    },
    block: { list: I('block:list'), add: I('block:add'), remove: I('block:remove') },
    att: { save: function (keys) { return shareAtts([].concat(keys)); }, open: function (key) { return shareAtts([key]); } },
    pickFiles: pickFiles,
    prefs: async function (p) { var cur = JSON.parse(localStorage.getItem('hamama-prefs') || '{"notify":true,"sound":true}'); if (p && typeof p === 'object') { for (var k in p) cur[k] = p[k]; localStorage.setItem('hamama-prefs', JSON.stringify(cur)); } return cur; },
    notify: notify,
    badge: async function () { return true; },
    defaultMail: async function () { return false; },
    print: async function () { window.print(); return true; },
    version: async function () { try { var i = await P.App.getInfo(); return i.version; } catch (e) { return '1.0.0'; } },
    on: function (ch, cb) { (listeners[ch] = listeners[ch] || []).push(cb); },
    setTitleBar: function () {},
    ready: function () {},
    _call: call
  };
})();
