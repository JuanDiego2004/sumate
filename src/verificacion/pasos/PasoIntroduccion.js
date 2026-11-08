import { Text, View } from 'react-native';
import PasoBase from '../componentes/PasoBase';
import IlustracionVerificacion from '../ilustraciones/IlustracionVerificacion';

const REQUISITOS = ['Tu DNI a la mano', 'Buena iluminación', 'Rostro descubierto'];

export default function PasoIntroduccion({ siguiente }) {
  return (
    <PasoBase
      ilustracion={<IlustracionVerificacion />}
      titulo="Verifica tu identidad"
      descripcion="Para cuidar a la comunidad necesitamos confirmar que eres tú. Toma menos de 2 minutos."
      textoBoton="Comenzar"
      onPress={siguiente}
    >
      <View className="items-center gap-4">
        <View className="flex-row flex-wrap justify-center gap-2">
          {REQUISITOS.map((r) => (
            <View key={r} className="rounded-full bg-marca-50 px-3.5 py-1.5">
              <Text className="text-xs font-semibold text-marca-700">{r}</Text>
            </View>
          ))}
        </View>
        <Text className="text-center text-xs leading-[18px] text-slate-400">
          Usamos tu DNI y tu foto solo para verificarte. No se muestran a otros vecinos.
        </Text>
      </View>
    </PasoBase>
  );
}
