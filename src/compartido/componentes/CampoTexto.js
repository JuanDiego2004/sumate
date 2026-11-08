import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function CampoTexto({
  etiqueta,
  error,
  secure = false,
  teclado = 'default',
  ...resto
}) {
  const [enfocado, setEnfocado] = useState(false);
  const [oculto, setOculto] = useState(secure);

  const borde = error ? 'border-rose-400' : enfocado ? 'border-marca-600' : 'border-slate-200';

  return (
    <View className="gap-1.5">
      <Text className="text-[13px] font-semibold text-slate-600">{etiqueta}</Text>

      <View className={`h-14 flex-row items-center rounded-2xl border-[1.5px] bg-white px-4 ${borde}`}>
        <TextInput
          className="flex-1 text-base text-tinta"
          placeholderTextColor="#94A3B8"
          keyboardType={teclado}
          secureTextEntry={oculto}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setEnfocado(true)}
          onBlur={() => setEnfocado(false)}
          {...resto}
        />
        {secure && (
          <Pressable onPress={() => setOculto((o) => !o)} hitSlop={10}>
            <Text className="text-xs font-bold text-marca-600">{oculto ? 'Mostrar' : 'Ocultar'}</Text>
          </Pressable>
        )}
      </View>

      {error ? <Text className="text-xs text-rose-500">{error}</Text> : null}
    </View>
  );
}
