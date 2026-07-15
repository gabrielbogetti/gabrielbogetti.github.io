// ============================================================
// UI COMPARTIDA (barra superior, mensajes)
// ============================================================

const UI = {
  renderTopbar(tituloPagina) {
    const s = Session.get();
    if (!s) return;
    const el = document.getElementById('topbar');
    if (!el) return;
    el.innerHTML = `
      <div class="topbar__brand">
        <svg class="pennant" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="10" y1="4" x2="10" y2="44" stroke="#E8590C" stroke-width="3" stroke-linecap="round"/>
          <path d="M10 6 L40 15 L10 24 Z" fill="#E8590C"/>
        </svg>
        <span class="topbar__title">${tituloPagina}</span>
      </div>
      <div class="topbar__user">
        <span>${s.nombre} · ${UI.nombreRol(s.rol)}</span>
        <button id="btnLogout">Salir</button>
      </div>
    `;
    document.getElementById('btnLogout').addEventListener('click', () => {
      Session.clear();
      window.location.href = 'index.html';
    });
  },

  nombreRol(rol) {
    return { admin: 'Admin', consulta: 'Consulta', control_acceso: 'Control de acceso' }[rol] || rol;
  },

  toast(mensaje, tipo = 'ok') {
    let cont = document.getElementById('toastContainer');
    if (!cont) {
      cont = document.createElement('div');
      cont.id = 'toastContainer';
      cont.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:999;display:flex;flex-direction:column;gap:8px;align-items:center;';
      document.body.appendChild(cont);
    }
    const t = document.createElement('div');
    const bg = tipo === 'error' ? '#b3401f' : '#1e8e5a';
    t.style.cssText = `background:${bg};color:#fff;padding:12px 18px;border-radius:8px;font-size:14px;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.2);opacity:0;transition:opacity .2s ease;`;
    t.textContent = mensaje;
    cont.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; });
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 300);
    }, 3200);
  }
};