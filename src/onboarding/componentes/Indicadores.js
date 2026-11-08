import { View } from 'react-native';

export default function Indicadores({ total, activo }) {
  return (
    <View className="flex-row items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={i === activo ? 'h-2 w-6 rounded-full bg-marca-600' : 'h-2 w-2 rounded-full bg-slate-200'}
        />
      ))}
    </View>
  );
}
