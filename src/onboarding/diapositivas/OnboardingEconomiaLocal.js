import Diapositiva from '../componentes/Diapositiva';
import IlustracionEconomiaLocal from '../ilustraciones/IlustracionEconomiaLocal';

export default function OnboardingEconomiaLocal({ ancho, alto, activa = true }) {
  return (
    <Diapositiva
      ancho={ancho}
      alto={alto}
      ilustracion={<IlustracionEconomiaLocal activa={activa} />}
      titulo="Economía local"
      descripcion="Encuentra negocios, emprendimientos y servicios cerca de ti. Busca por nombre u oficio, o explora por categorías."
      puntos={['Buscador', 'Tiendas y ferreterías', 'Salud y educación', 'Calificación de 1 a 5']}
    />
  );
}
