import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PASOS } from '../pasos';
import BarraProgreso from './BarraProgreso';

export default function PantallaVerificacion({ onTerminar }) {
  const [indice, setIndice] = useState(0);
  const [datos, setDatos] = useState({ dni: '', frente: null, reverso: null, selfie: null });

  const esUltimo = indice === PASOS.length - 1;
  const Paso = PASOS[indice];

  const actualizar = (parcial) => setDatos((d) => ({ ...d, ...parcial }));
  const siguiente = () => setIndice((i) => Math.min(i + 1, PASOS.length - 1));
  const atras = () => setIndice((i) => Math.max(i - 1, 0));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="h-14 flex-row items-center gap-4 px-6">
        {indice > 0 && !esUltimo ? (
          <Pressable
            onPress={atras}
            hitSlop={12}
            accessibilityLabel="Volver"
            className="h-9 w-9 items-center justify-center rounded-full bg-marca-50"
          >
            <Text className="text-xl font-bold text-marca-700">‹</Text>
          </Pressable>
        ) : (
          <View className="h-9 w-9" />
        )}
        <BarraProgreso total={PASOS.length} actual={indice} />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Paso datos={datos} actualizar={actualizar} siguiente={siguiente} onTerminar={onTerminar} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
