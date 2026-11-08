import CapturaCamara from '../componentes/CapturaCamara';
import PasoBase from '../componentes/PasoBase';

export default function PasoDniFrente({ actualizar, siguiente }) {
  return (
    <PasoBase
      titulo="Frente de tu DNI"
      descripcion="Colócalo dentro del marco, sin reflejos ni sombras."
    >
      <CapturaCamara
        facing="back"
        forma="documento"
        onConfirmar={(uri) => {
          actualizar({ frente: uri });
          siguiente();
        }}
      />
    </PasoBase>
  );
}
