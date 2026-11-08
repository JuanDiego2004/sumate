import { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DIAPOSITIVAS } from '../diapositivas';
import BotonSiguiente from './BotonSiguiente';
import Indicadores from './Indicadores';

export default function PantallaOnboarding({ onTerminar }) {
  const { width } = useWindowDimensions();
  const lista = useRef(null);
  const [indice, setIndice] = useState(0);
  const [altoLista, setAltoLista] = useState(0);
  const esUltima = indice === DIAPOSITIVAS.length - 1;

  const alTerminarDeDeslizar = (e) => {
    setIndice(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const siguiente = () => {
    if (esUltima) {
      onTerminar?.();
      return;
    }
    lista.current?.scrollToIndex({ index: indice + 1, animated: true });
    setIndice(indice + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="h-12 flex-row items-center justify-end px-6">
        {!esUltima && (
          <Pressable onPress={onTerminar} hitSlop={12} accessibilityRole="button">
            <Text className="text-sm font-semibold text-slate-600">Omitir</Text>
          </Pressable>
        )}
      </View>

      <View
        className="flex-1"
        onLayout={(e) => {
          const alto = e.nativeEvent.layout.height;
          setAltoLista((actual) => (actual === alto ? actual : alto));
        }}
      >
        <FlatList
          ref={lista}
          style={{ flex: 1 }}
          data={DIAPOSITIVAS}
          extraData={indice}
          keyExtractor={(_, i) => String(i)}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
          onMomentumScrollEnd={alTerminarDeDeslizar}
          renderItem={({ item: Escena, index }) => <Escena ancho={width} alto={altoLista} activa={index === indice} />}
        />
      </View>

      <View className="flex-row items-center justify-between px-8 pb-6 pt-2">
        <Indicadores total={DIAPOSITIVAS.length} activo={indice} />
        <BotonSiguiente texto={esUltima ? 'Empezar' : 'Siguiente'} onPress={siguiente} />
      </View>
    </SafeAreaView>
  );
}
