import { useRouter } from 'expo-router';
import { PantallaAcceso } from '../autenticacion';

export default function RutaAcceso() {
  const router = useRouter();
  // Tras iniciar sesión o registrarse, "/" decide si falta verificar o ir al inicio.
  return <PantallaAcceso onExito={() => router.replace('/')} />;
}
