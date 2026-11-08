import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import BotonPrimario from '../../compartido/componentes/BotonPrimario';
import BotonSecundario from '../../compartido/componentes/BotonSecundario';
import { COLORES } from '../../onboarding/tema';

const GUIAS = {
  documento: {
    style: { width: '88%', aspectRatio: 1.586 },
    clase: 'rounded-2xl',
    ayuda: 'Encuadra tu DNI dentro del marco',
  },
  rostro: {
    style: { width: '62%', aspectRatio: 0.75 },
    clase: 'rounded-full',
    ayuda: 'Centra tu rostro en el óvalo',
  },
};

// facing: 'back' | 'front'   ·   forma: 'documento' | 'rostro'
export default function CapturaCamara({ facing = 'back', forma = 'documento', onConfirmar }) {
  const camara = useRef(null);
  const [permiso, pedirPermiso] = useCameraPermissions();
  const [direccion, setDireccion] = useState(facing);
  const [foto, setFoto] = useState(null);
  const [capturando, setCapturando] = useState(false);
  const [errorCaptura, setErrorCaptura] = useState('');
  const guia = GUIAS[forma];

  const tomarFoto = async () => {
    if (!camara.current || capturando) return;
    setCapturando(true);
    try {
      const resultado = await camara.current.takePictureAsync({ quality: 0.7 });
      setFoto(resultado.uri);
      setErrorCaptura('');
    } catch {
      setErrorCaptura('No pudimos tomar la foto. Inténtalo de nuevo.');
    } finally {
      setCapturando(false);
    }
  };

  if (!permiso) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={COLORES.marca600} />
      </View>
    );
  }

  if (!permiso.granted) {
    return (
      <View className="flex-1 items-center justify-center gap-4 px-4">
        <Text className="text-center text-base leading-6 text-slate-500">
          Necesitamos la cámara para verificar tu identidad. Solo se usa en este proceso.
        </Text>
        <BotonPrimario
          texto={permiso.canAskAgain ? 'Permitir cámara' : 'Abrir ajustes'}
          onPress={permiso.canAskAgain ? pedirPermiso : () => Linking.openSettings()}
        />
      </View>
    );
  }

  if (foto) {
    return (
      <View className="flex-1">
        <View className="flex-1 overflow-hidden rounded-[32px] bg-slate-100">
          <Image source={{ uri: foto }} className="h-full w-full" resizeMode="cover" />
        </View>
        <View className="mt-4 flex-row gap-3">
          <View className="flex-1">
            <BotonSecundario texto="Repetir" onPress={() => setFoto(null)} />
          </View>
          <View className="flex-1">
            <BotonPrimario texto="Usar foto" onPress={() => onConfirmar(foto)} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-1 overflow-hidden rounded-[32px] bg-slate-900">
        <CameraView ref={camara} facing={direccion} style={StyleSheet.absoluteFill} />

        {forma === 'rostro' ? (
          <Pressable
            onPress={() => setDireccion((actual) => (actual === 'front' ? 'back' : 'front'))}
            accessibilityRole="button"
            accessibilityLabel="Cambiar entre cámara frontal y trasera"
            className="absolute right-4 top-4 rounded-full bg-black/55 px-4 py-2.5"
          >
            <Text className="text-sm font-bold text-white">Cambiar cámara</Text>
          </Pressable>
        ) : null}

        <View
          pointerEvents="none"
          className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
        >
          <View className={`border-[3px] border-white/90 ${guia.clase}`} style={guia.style} />
        </View>

        <View className="absolute bottom-4 self-center rounded-full bg-black/50 px-4 py-2">
          <Text className="text-xs font-semibold text-white">{guia.ayuda}</Text>
        </View>
      </View>

      {errorCaptura ? (
        <Text className="mt-3 text-center text-sm text-rose-500">{errorCaptura}</Text>
      ) : null}

      <Pressable
        onPress={tomarFoto}
        accessibilityRole="button"
        accessibilityLabel="Tomar foto"
        className="mt-4 h-20 w-20 items-center justify-center self-center rounded-full border-4 border-marca-600"
      >
        {capturando ? (
          <ActivityIndicator color={COLORES.marca600} />
        ) : (
          <View className="h-14 w-14 rounded-full bg-marca-600" />
        )}
      </Pressable>
    </View>
  );
}
