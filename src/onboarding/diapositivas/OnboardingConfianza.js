import Diapositiva from '../componentes/Diapositiva';
import IlustracionConfianza from '../ilustraciones/IlustracionConfianza';

export default function OnboardingConfianza({ ancho, alto }) {
  return (
    <Diapositiva
      ancho={ancho}
      alto={alto}
      ilustracion={<IlustracionConfianza />}
      titulo="Una comunidad en la que confiar"
      descripcion="Califica tu experiencia de 1 a 5 estrellas en economía local y solidaria, y reporta publicaciones engañosas o inadecuadas."
      nota="En emergencias no hay estrellas: solo reportes y moderación."
    />
  );
}
