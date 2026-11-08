import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IlustracionAcceso from '../ilustraciones/IlustracionAcceso';

// Zona superior a todo el ancho, como el hero de la referencia.
export default function EncabezadoAcceso() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: top + 12 }}
      className="items-center rounded-b-[40px] bg-marca-50 px-6 pb-4"
    >
      <View className="h-14 min-w-14 items-center justify-center rounded-2xl bg-white px-3">
        <Text className="text-xl font-extrabold text-marca-600">+te</Text>
      </View>
      <IlustracionAcceso />
    </View>
  );
}
