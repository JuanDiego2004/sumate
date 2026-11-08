import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useSesion } from '../../sesion';
import PasoBase from '../componentes/PasoBase';
import IlustracionListo from '../ilustraciones/IlustracionListo';
import { enviarVerificacion } from '../servicios/enviarVerificacion';

function Miniatura({ etiqueta, uri }) {
  return (
    <View className="flex-1 gap-1.5">
      <Image source={{ uri }} className="h-24 w-full rounded-2xl bg-slate-100" resizeMode="cover" />
      <Text className="text-center text-xs font-semibold text-slate-500">{etiqueta}</Text>
    </View>
  );
}

// Fases: 'revisar' → 'enviando' → 'listo'
export default function PasoResultado({ datos, onTerminar }) {
  const { marcarVerificado } = useSesion();
  const [fase, setFase] = useState('revisar');
  const [error, setError] = useState('');

  const enviar = async () => {
    setFase('enviando');
    setError('');
    try {
      await enviarVerificacion(datos);
      marcarVerificado();
      setFase('listo');
    } catch (e) {
      setError(e?.message || 'No pudimos enviar tu verificación. Inténtalo de nuevo.');
      setFase('revisar');
    }
  };

  if (fase === 'listo') {
    return (
      <PasoBase
        ilustracion={<IlustracionListo />}
        titulo="¡Todo listo!"
        descripcion="Recibimos tu verificación. Ya puedes entrar a tu comunidad."
        textoBoton="Ir al inicio"
        onPress={onTerminar}
      />
    );
  }

  return (
    <PasoBase
      titulo="Revisa tus datos"
      descripcion="Confirma que las fotos se vean claras antes de enviarlas."
      textoBoton="Enviar verificación"
      onPress={enviar}
      cargando={fase === 'enviando'}
    >
      <View className="gap-4">
        <View className="flex-row gap-3">
          <Miniatura etiqueta="DNI frente" uri={datos.frente} />
          <Miniatura etiqueta="DNI reverso" uri={datos.reverso} />
          <Miniatura etiqueta="Selfie" uri={datos.selfie} />
        </View>
        <Text className="text-center text-sm text-slate-500">
          DNI terminado en <Text className="font-bold text-tinta">{datos.dni.slice(-3)}</Text>
        </Text>
        {error ? <Text className="text-center text-sm text-rose-500">{error}</Text> : null}
      </View>
    </PasoBase>
  );
}
