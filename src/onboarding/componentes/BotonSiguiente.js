import { Pressable, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function BotonSiguiente({ texto, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-2 rounded-full bg-marca-600 px-6 py-3.5 shadow-lg shadow-marca-600/40 active:bg-marca-700"
    >
      <Text className="text-[15px] font-bold text-white">{texto}</Text>
      <Svg width={10} height={12} viewBox="0 0 10 12">
        <Path d="M1 1 L9 6 L1 11 Z" fill="#FFFFFF" />
      </Svg>
    </Pressable>
  );
}
