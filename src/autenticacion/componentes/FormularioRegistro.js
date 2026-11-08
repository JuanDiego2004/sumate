import { useState } from 'react';
import { Text, View } from 'react-native';
import BotonPrimario from '../../compartido/componentes/BotonPrimario';
import CampoTexto from '../../compartido/componentes/CampoTexto';
import { validarClave, validarCorreo, validarNombre } from '../../compartido/validaciones';
import { useSesion } from '../../sesion';

export default function FormularioRegistro({ onExito }) {
  const { registrar } = useSesion();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviar = async () => {
    const nuevos = {
      nombre: validarNombre(nombre),
      correo: validarCorreo(correo),
      clave: validarClave(clave),
    };
    setErrores(nuevos);
    if (nuevos.nombre || nuevos.correo || nuevos.clave) return;

    setCargando(true);
    setErrorGeneral('');
    try {
      await registrar({ nombre: nombre.trim(), correo: correo.trim(), clave });
      onExito?.();
    } catch (e) {
      setErrorGeneral(e?.message || 'No pudimos crear tu cuenta. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View className="gap-4">
      <CampoTexto
        etiqueta="Nombre completo"
        placeholder="Como aparece en tu DNI"
        autoCapitalize="words"
        value={nombre}
        onChangeText={setNombre}
        error={errores.nombre}
      />
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
        placeholder="Mínimo 8 caracteres"
        secure
        value={clave}
        onChangeText={setClave}
        error={errores.clave}
      />

      <Text className="text-center text-xs leading-[18px] text-slate-400">
        Al crear tu cuenta aceptas los Términos de uso y la Política de privacidad. Después te pediremos
        verificar tu identidad.
      </Text>

      {errorGeneral ? <Text className="text-center text-sm text-rose-500">{errorGeneral}</Text> : null}

      <BotonPrimario texto="Crear cuenta" onPress={enviar} cargando={cargando} />
    </View>
  );
}
