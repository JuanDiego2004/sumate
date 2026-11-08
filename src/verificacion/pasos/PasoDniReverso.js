import CapturaCamara from '../componentes/CapturaCamara';
import PasoBase from '../componentes/PasoBase';

export default function PasoDniReverso({ actualizar, siguiente }) {
  return (
    <PasoBase
      titulo="Reverso de tu DNI"
      descripcion="Ahora la parte de atrás. Todos los datos deben leerse bien."
    >
      <CapturaCamara
        facing="back"
        forma="documento"
        onConfirmar={(uri) => {
          actualizar({ reverso: uri });
          siguiente();
        }}
      />
    </PasoBase>
  );
}
