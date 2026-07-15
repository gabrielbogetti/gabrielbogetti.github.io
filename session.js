// ============================================================
// SESIÓN DE USUARIO
// ============================================================
// Guarda el token de login en localStorage y controla el acceso
// a cada página según el rol (admin / consulta / control_acceso).

const Session = {
  KEY: 'sba_session',

  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  get() {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  },

  getToken() {
    const s = this.get();
    return s ? s.token : null;
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },

  _decodePayload(token) {
    const parte = token.split('.')[0];
    let b64 = parte.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    return JSON.parse(atob(b64));
  },

  isExpired() {
    const s = this.get();
    if (!s || !s.token) return true;
    try {
      const payload = this._decodePayload(s.token);
      return Date.now() > payload.exp;
    } catch (e) {
      return true;
    }
  },

  // Llamar al inicio de cada página protegida.
  // Si no hay sesión válida o el rol no está permitido, redirige al login.
  requireRole(rolesPermitidos) {
    const s = this.get();
    if (!s || this.isExpired()) {
      this.clear();
      window.location.href = 'index.html';
      return null;
    }
    if (!rolesPermitidos.includes(s.rol)) {
      window.location.href = 'index.html';
      return null;
    }
    return s;
  },

  redirectByRole(rol) {
    if (rol === 'admin') window.location.href = 'admin.html';
    else if (rol === 'consulta') window.location.href = 'consulta.html';
    else if (rol === 'control_acceso') window.location.href = 'control-acceso.html';
    else window.location.href = 'index.html';
  }
};