import { Pressable, Text } from 'react-native';

export default function BotonSecundario({ texto, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="h-14 w-full items-center justify-center rounded-full border-[1.5px] border-slate-200 bg-white px-6 active:bg-slate-50"
    >
      <Text className="text-base font-bold text-tinta">{texto}</Text>
    </Pressable>
  );
}
