import { ActivityIndicator, Pressable, Text } from 'react-native';

export default function BotonPrimario({ texto, onPress, cargando = false, deshabilitado = false }) {
  const inactivo = cargando || deshabilitado;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactivo}
      accessibilityRole="button"
      className={`h-14 w-full items-center justify-center rounded-full bg-marca-600 shadow-lg shadow-marca-600/30 active:bg-marca-700 ${
        inactivo ? 'opacity-60' : ''
      }`}
    >
      {cargando ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-base font-bold text-white">{texto}</Text>
      )}
    </Pressable>
  );
}
