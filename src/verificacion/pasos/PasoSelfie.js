import CapturaCamara from '../componentes/CapturaCamara';
import PasoBase from '../componentes/PasoBase';

export default function PasoSelfie({ actualizar, siguiente }) {
  return (
    <PasoBase
      titulo="Tómate una selfie"
      descripcion="Mira a la cámara, sin lentes ni gorra y con buena luz."
    >
      <CapturaCamara
        facing="front"
        forma="rostro"
        onConfirmar={(uri) => {
          actualizar({ selfie: uri });
          siguiente();
        }}
      />
    </PasoBase>
  );
}
