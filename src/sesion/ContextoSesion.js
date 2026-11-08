import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const Contexto = createContext(null);

// Estado en memoria. Para persistirlo entre aperturas de la app guarda
// onboardingVisto y el token en expo-secure-store o AsyncStorage.
export function SesionProvider({ children }) {
  const [onboardingVisto, setOnboardingVisto] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = useCallback(async ({ correo }) => {
    // TODO: reemplazar por tu API. El backend indica si el usuario ya está verificado.
    setUsuario({ nombre: correo.split('@')[0], correo, verificado: true });
  }, []);

  const registrar = useCallback(async ({ nombre, correo }) => {
    // TODO: reemplazar por tu API. Un usuario nuevo empieza sin verificar.
    setUsuario({ nombre, correo, verificado: false });
  }, []);

  const marcarVerificado = useCallback(() => {
    setUsuario((u) => (u ? { ...u, verificado: true } : u));
  }, []);

  const cerrarSesion = useCallback(() => setUsuario(null), []);
  const marcarOnboardingVisto = useCallback(() => setOnboardingVisto(true), []);

  const valor = useMemo(
    () => ({
      onboardingVisto,
      usuario,
      iniciarSesion,
      registrar,
      marcarVerificado,
      cerrarSesion,
      marcarOnboardingVisto,
    }),
    [onboardingVisto, usuario, iniciarSesion, registrar, marcarVerificado, cerrarSesion, marcarOnboardingVisto],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSesion() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
