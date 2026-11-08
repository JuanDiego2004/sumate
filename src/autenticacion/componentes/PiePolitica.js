import { Linking, Pressable, Text, View } from 'react-native';

const TERMINOS = 'https://tu-sitio.com/terminos'; // TODO: tus enlaces reales
const PRIVACIDAD = 'https://tu-sitio.com/privacidad';

export default function PiePolitica() {
  return (
    <View className="mt-8 flex-row justify-center gap-2">
      <Pressable onPress={() => Linking.openURL(TERMINOS)} hitSlop={8}>
        <Text className="text-xs text-slate-400">Términos de uso</Text>
      </Pressable>
      <Text className="text-xs text-slate-300">|</Text>
      <Pressable onPress={() => Linking.openURL(PRIVACIDAD)} hitSlop={8}>
        <Text className="text-xs text-slate-400">Política de privacidad</Text>
      </Pressable>
    </View>
  );
}
