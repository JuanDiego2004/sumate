import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import BotonPrimario from '../../compartido/componentes/BotonPrimario';
import CampoTexto from '../../compartido/componentes/CampoTexto';
import { validarCorreo } from '../../compartido/validaciones';
import { useSesion } from '../../sesion';

export default function FormularioLogin({ onExito }) {
  const { iniciarSesion } = useSesion();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviar = async () => {
    const nuevos = {
      correo: validarCorreo(correo),
      clave: clave ? '' : 'Escribe tu contraseña',
    };
    setErrores(nuevos);
    if (nuevos.correo || nuevos.clave) return;

    setCargando(true);
    setErrorGeneral('');
    try {
      await iniciarSesion({ correo: correo.trim(), clave });
      onExito?.();
    } catch (e) {
      setErrorGeneral(e?.message || 'No pudimos iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View className="gap-4">
      <CampoTexto
        etiqueta="Correo electrónico"
        placeholder="tucorreo@ejemplo.com"
        teclado="email-address"
        value={correo}
        onChangeText={setCorreo}
        error={errores.correo}
      />
      <CampoTexto
        etiqueta="Contraseña"
        placeholder="Tu contraseña"
        secure
        value={clave}
        onChangeText={setClave}
        error={errores.clave}
      />

      <Pressable className="self-end" hitSlop={8}>
        <Text className="text-[13px] font-semibold text-marca-600">¿Olvidaste tu contraseña?</Text>
      </Pressable>

      {errorGeneral ? <Text className="text-center text-sm text-rose-500">{errorGeneral}</Text> : null}

      <BotonPrimario texto="Iniciar sesión" onPress={enviar} cargando={cargando} />
    </View>
  );
}
