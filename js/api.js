// ============================================================
// CLIENTE DE LA API (Google Apps Script)
// ============================================================
// Nota: se manda Content-Type text/plain a propósito, aunque el
// body sea JSON. Es lo que evita que el navegador dispare un
// preflight OPTIONS que Apps Script no responde bien.

const API = {
  async call(action, data = {}) {
    const token = Session.getToken();
    const body = { action, data: { ...data, token } };

    let res;
    try {
      res = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body)
      });
    } catch (e) {
      return { ok: false, error: 'No se pudo conectar con el servidor. Revisá tu conexión.' };
    }

    if (!res.ok) {
      return { ok: false, error: 'Error del servidor (' + res.status + ')' };
    }

    try {
      return await res.json();
    } catch (e) {
      return { ok: false, error: 'Respuesta inválida del servidor.' };
    }
  }
};
