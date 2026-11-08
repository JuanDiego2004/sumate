import { useEffect } from 'react';
import '../global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BricolageGrotesque_500Medium } from '@expo-google-fonts/bricolage-grotesque/500Medium';
import { BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque/700Bold';
import { useFonts } from 'expo-font';
import { SesionProvider } from '../sesion';

SplashScreen.preventAutoHideAsync();

export default function LayoutRaiz() {
  const [loaded, error] = useFonts({
    BricolageGrotesque_500Medium,
    BricolageGrotesque_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SesionProvider>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </SesionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
