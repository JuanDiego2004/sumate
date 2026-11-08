import { useRouter } from 'expo-router';
import { PantallaVerificacion } from '../verificacion';

export default function RutaVerificacion() {
  const router = useRouter();
  return <PantallaVerificacion onTerminar={() => router.replace('/')} />;
}
