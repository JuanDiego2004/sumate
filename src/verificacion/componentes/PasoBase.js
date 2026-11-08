import { Text, View } from 'react-native';
import BotonPrimario from '../../compartido/componentes/BotonPrimario';

// Plantilla de cada paso: ilustración opcional, título y texto centrados,
// contenido en medio y botón principal abajo.
export default function PasoBase({
  ilustracion,
  titulo,
  descripcion,
  children,
  textoBoton,
  onPress,
  cargando,
  deshabilitado,
}) {
  return (
    <View className="flex-1 px-6 pb-6">
      {ilustracion ? <View className="items-center">{ilustracion}</View> : null}

      <Text className="text-center text-[28px] font-extrabold leading-9 text-tinta">{titulo}</Text>
      <Text className="mt-2 text-center text-base leading-6 text-slate-500">{descripcion}</Text>

      <View className="mt-5 flex-1">{children}</View>

      {textoBoton ? (
        <View className="pt-4">
          <BotonPrimario
            texto={textoBoton}
            onPress={onPress}
            cargando={cargando}
            deshabilitado={deshabilitado}
          />
        </View>
      ) : null}
    </View>
  );
}
