import Diapositiva from '../componentes/Diapositiva';
import IlustracionEconomiaSolidaria from '../ilustraciones/IlustracionEconomiaSolidaria';

export default function OnboardingEconomiaSolidaria({ ancho, alto }) {
  return (
    <Diapositiva
      ancho={ancho}
      alto={alto}
      ilustracion={<IlustracionEconomiaSolidaria />}
      titulo="Economía solidaria"
      descripcion="Ayúdate con tus vecinos: publica lo que ofreces, pide lo que necesitas o intercambia productos y habilidades sin dinero de por medio."
      puntos={['¿Quieres vender?', '¿Quieres comprar?', '¿Quieres intercambiar?']}
    />
  );
}
