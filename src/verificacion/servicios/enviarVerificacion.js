// Envía el DNI y las 3 fotos a tu backend.
// Importante: la comprobación real (lectura del documento, coincidencia del rostro,
// prueba de vida) debe hacerla tu servidor o un proveedor de verificación, no la app.
export async function enviarVerificacion({ dni, frente, reverso, selfie }) {
  // TODO: reemplazar por tu API (siempre por HTTPS).
  // const form = new FormData();
  // form.append('dni', dni);
  // form.append('frente', { uri: frente, name: 'frente.jpg', type: 'image/jpeg' });
  // form.append('reverso', { uri: reverso, name: 'reverso.jpg', type: 'image/jpeg' });
  // form.append('selfie', { uri: selfie, name: 'selfie.jpg', type: 'image/jpeg' });
  // const r = await fetch(`${API_URL}/verificacion`, { method: 'POST', body: form });
  // if (!r.ok) throw new Error('No pudimos enviar tu verificación. Inténtalo de nuevo.');

  await new Promise((r) => setTimeout(r, 1200));
}
