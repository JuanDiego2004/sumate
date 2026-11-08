import { Text, View } from 'react-native';

// Plantilla visual: ilustración arriba y texto a la izquierda abajo.
export default function Diapositiva({ ancho, alto, ilustracion, titulo, descripcion, puntos, nota }) {
  return (
    <View style={{ width: ancho, height: alto }} className="px-8">
      <View className="flex-[1.15] items-center justify-center">{ilustracion}</View>

      <View className="flex-1">
        <Text className="text-[32px] font-extrabold leading-[38px] text-slate-950">{titulo}</Text>
        <Text className="mt-3 text-base font-medium leading-6 text-slate-700">{descripcion}</Text>

        {puntos?.length > 0 && (
          <View className="mt-5 flex-row flex-wrap gap-2">
            {puntos.map((punto) => (
              <View key={punto} className="rounded-full bg-marca-50 px-3.5 py-1.5">
                <Text className="text-xs font-semibold text-marca-700">{punto}</Text>
              </View>
            ))}
          </View>
        )}

        {nota ? <Text className="mt-4 text-sm leading-5 text-slate-600">{nota}</Text> : null}
      </View>
    </View>
  );
}
