import { useState } from 'react';
import CampoTexto from '../../compartido/componentes/CampoTexto';
import { validarDni } from '../../compartido/validaciones';
import PasoBase from '../componentes/PasoBase';

export default function PasoNumeroDni({ datos, actualizar, siguiente }) {
  const [error, setError] = useState('');

  const continuar = () => {
    const mensaje = validarDni(datos.dni);
    if (mensaje) return setError(mensaje);
    siguiente();
  };

  return (
    <PasoBase
      titulo="Ingresa tu DNI"
      descripcion="Escribe los 8 números de tu documento."
      textoBoton="Continuar"
      onPress={continuar}
    >
      <CampoTexto
        etiqueta="Número de DNI"
        placeholder="12345678"
        teclado="number-pad"
        maxLength={8}
        value={datos.dni}
        onChangeText={(texto) => {
          actualizar({ dni: texto.replace(/\D/g, '') });
          setError('');
        }}
        error={error}
      />
    </PasoBase>
  );
}
