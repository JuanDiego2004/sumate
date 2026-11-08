// Cada validador devuelve '' si es válido, o el mensaje de error.
export const validarCorreo = (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? '' : 'Escribe un correo válido');
export const validarClave = (v) => (v.length >= 8 ? '' : 'Usa al menos 8 caracteres');
export const validarNombre = (v) => (v.trim().length >= 3 ? '' : 'Escribe tu nombre completo');
export const validarDni = (v) => (/^\d{8}$/.test(v) ? '' : 'El DNI debe tener 8 números');
