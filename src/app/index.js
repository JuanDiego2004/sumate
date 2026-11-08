import { Redirect } from 'expo-router';
import { useSesion } from '../sesion';

// Punto de decisión único: según el estado, manda a la pantalla correcta.
export default function Inicio() {
  const { onboardingVisto, usuario } = useSesion();

  if (!onboardingVisto) return <Redirect href="/onboarding" />;
  if (!usuario) return <Redirect href="/acceso" />;
  if (!usuario.verificado) return <Redirect href="/verificacion" />;
  return <Redirect href="/inicio" />;
}
