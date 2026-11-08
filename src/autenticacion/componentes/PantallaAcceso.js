import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Pestanas from '../../compartido/componentes/Pestanas';
import EncabezadoAcceso from './EncabezadoAcceso';
import FormularioLogin from './FormularioLogin';
import FormularioRegistro from './FormularioRegistro';
import PiePolitica from './PiePolitica';

const OPCIONES = [
  { id: 'ingresar', texto: 'Iniciar sesión' },
  { id: 'crear', texto: 'Crear cuenta' },
];

const TEXTOS = {
  ingresar: { titulo: 'Qué bueno verte', detalle: 'Entra para ver lo que pasa en tu barrio.' },
  crear: { titulo: 'Únete a tu comunidad', detalle: 'Crea tu cuenta en un minuto.' },
};

export default function PantallaAcceso({ onExito }) {
  const [pestana, setPestana] = useState('ingresar');
  const esLogin = pestana === 'ingresar';

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <EncabezadoAcceso />

        <View className="px-6 pb-8 pt-6">
          <Text className="text-center text-[28px] font-extrabold leading-9 text-tinta">
            {TEXTOS[pestana].titulo}
          </Text>
          <Text className="mt-2 text-center text-base leading-6 text-slate-500">
            {TEXTOS[pestana].detalle}
          </Text>

          <View className="mt-5">
            <Pestanas opciones={OPCIONES} activa={pestana} onCambiar={setPestana} />
          </View>

          <View className="mt-5">
            {esLogin ? <FormularioLogin onExito={onExito} /> : <FormularioRegistro onExito={onExito} />}
          </View>

          <PiePolitica />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
