'use strict';
/* ============================================================
   Hamama — connexion sécurisée OAuth2 (Microsoft / Google)
   Flux « application de bureau » : PKCE + redirection locale http://localhost
   Les identifiants client se créent gratuitement :
     • Microsoft : portal.azure.com → Inscriptions d’applications → « Client public / natif »,
       redirection http://localhost, autorisations IMAP.AccessAsUser.All + SMTP.Send + offline_access
     • Google : console.cloud.google.com → Identifiants → ID client OAuth « Application de bureau »
   ============================================================ */
const http = require('http');
const crypto = require('crypto');

const CLIENTS = {
  microsoft: {
    id: process.env.HAMAMA_MS_CLIENT_ID || '',
    auth: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize',
    token: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
    scope: 'https://outlook.office.com/IMAP.AccessAsUser.All https://outlook.office.com/SMTP.Send offline_access openid email profile'
  },
  google: {
    id: process.env.HAMAMA_GOOGLE_CLIENT_ID || '',
    secret: process.env.HAMAMA_GOOGLE_CLIENT_SECRET || '', // Google le demande aussi pour les applis de bureau (non confidentiel)
    auth: 'https://accounts.google.com/o/oauth2/v2/auth',
    token: 'https://oauth2.googleapis.com/token',
    scope: 'https://mail.google.com/ openid email profile'
  }
};
const available = () => Object.fromEntries(Object.entries(CLIENTS).map(([k, v]) => [k, !!v.id]));

let NET = null, OPEN = null, MAIL = null;
const tokens = new Map(); // accountId -> { at, exp }
const b64u = b => b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function post(url, form) {
  const r = await NET(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(form).toString() });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error_description || j.error || ('HTTP ' + r.status));
  return j;
}
function idEmail(idToken) { try { return JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString()).email || ''; } catch { return ''; } }

/** Ouvre le navigateur, attend l’autorisation et renvoie { provider, email, refresh, access, exp } */
function signIn(provider, hint) {
  const C = CLIENTS[provider];
  if (!C || !C.id) return Promise.reject(new Error('Connexion ' + provider + ' pas encore configurée (identifiant client manquant).'));
  const verifier = b64u(crypto.randomBytes(32)), challenge = b64u(crypto.createHash('sha256').update(verifier).digest()), state = b64u(crypto.randomBytes(16));
  return new Promise((resolve, reject) => {
    const srv = http.createServer(async (req, res) => {
      const u = new URL(req.url, 'http://localhost');
      if (u.pathname !== '/') { res.writeHead(404); return res.end(); }
      const done = (ok, msg) => { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(`<!doctype html><meta charset=utf-8><body style="font:16px system-ui;background:#1e2026;color:#e8eaf0;display:grid;place-items:center;height:90vh"><div style="text-align:center"><div style="font-size:44px">${ok ? '✅' : '⚠️'}</div><p>${msg}</p><p style="color:#9aa0ad">Tu peux fermer cet onglet et revenir dans Hamama.</p></div>`); };
      try {
        if (u.searchParams.get('state') !== state) throw new Error('Réponse inattendue');
        if (u.searchParams.get('error')) throw new Error(u.searchParams.get('error_description') || u.searchParams.get('error'));
        const j = await post(C.token, { client_id: C.id, ...(C.secret ? { client_secret: C.secret } : {}), grant_type: 'authorization_code', code: u.searchParams.get('code'), redirect_uri: redirect, code_verifier: verifier, scope: C.scope });
        done(true, 'Compte connecté à Hamama.');
        resolve({ provider, email: idEmail(j.id_token) || hint || '', refresh: j.refresh_token, access: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 });
      } catch (e) { done(false, String(e.message || e)); reject(e); }
      finally { setTimeout(() => srv.close(), 500); }
    });
    let redirect = '';
    srv.listen(0, '127.0.0.1', () => {
      redirect = `http://localhost:${srv.address().port}/`;
      const q = new URLSearchParams({ client_id: C.id, response_type: 'code', redirect_uri: redirect, scope: C.scope, state, code_challenge: challenge, code_challenge_method: 'S256', prompt: 'select_account', ...(provider === 'google' ? { access_type: 'offline' } : {}), ...(hint ? { login_hint: hint } : {}) });
      OPEN(C.auth + '?' + q.toString());
    });
    setTimeout(() => { try { srv.close(); } catch {} reject(new Error('Délai dépassé : connexion annulée.')); }, 5 * 60000);
  });
}

/** Jeton d’accès valide pour un compte (renouvelé automatiquement) */
async function token(a) {
  const t = tokens.get(a.id);
  if (t && t.exp - 60000 > Date.now()) return t.at;
  const C = CLIENTS[a.oauth.provider];
  if (a.oauth.pendingAccess && a.oauth.pendingExp > Date.now()) { tokens.set(a.id, { at: a.oauth.pendingAccess, exp: a.oauth.pendingExp }); return a.oauth.pendingAccess; }
  const refresh = a.oauth.refreshEnc ? MAIL.dec(a.oauth.refreshEnc) : a.oauth.refresh;
  const j = await post(C.token, { client_id: C.id, ...(C.secret ? { client_secret: C.secret } : {}), grant_type: 'refresh_token', refresh_token: refresh, scope: C.scope });
  if (j.refresh_token && j.refresh_token !== refresh && a.id) { a.oauth.refreshEnc = MAIL.enc(j.refresh_token); delete a.oauth.refresh; MAIL.save(); }
  if (a.id) tokens.set(a.id, { at: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 });
  return j.access_token;
}

function init({ netFetch, openExternal, mail }) { NET = netFetch; OPEN = openExternal; MAIL = mail; }
module.exports = { init, signIn, token, available };
