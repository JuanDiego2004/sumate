import { useRouter } from 'expo-router';
import { PantallaOnboarding } from '../onboarding';
import { useSesion } from '../sesion';

export default function RutaOnboarding() {
  const router = useRouter();
  const { marcarOnboardingVisto } = useSesion();

  return (
    <PantallaOnboarding
      onTerminar={() => {
        marcarOnboardingVisto();
        router.replace('/');
      }}
    />
  );
}
