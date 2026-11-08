import { Pressable, Text, View } from 'react-native';

// Selector tipo "segmentado": opciones = [{ id, texto }]
export default function Pestanas({ opciones, activa, onCambiar }) {
  return (
    <View className="flex-row rounded-full bg-marca-50 p-1" accessibilityRole="tablist">
      {opciones.map((opcion) => {
        const seleccionada = opcion.id === activa;
        return (
          <Pressable
            key={opcion.id}
            onPress={() => onCambiar(opcion.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: seleccionada }}
            className={`flex-1 items-center rounded-full py-3 ${
              seleccionada ? 'bg-white shadow-md shadow-marca-600/20' : ''
            }`}
          >
            <Text className={`text-sm font-bold ${seleccionada ? 'text-marca-700' : 'text-slate-500'}`}>
              {opcion.texto}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
