import { View } from 'react-native';

export default function BarraProgreso({ total, actual }) {
  return (
    <View className="flex-1 flex-row gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={`h-1.5 flex-1 rounded-full ${i <= actual ? 'bg-marca-600' : 'bg-slate-200'}`}
        />
      ))}
    </View>
  );
}
