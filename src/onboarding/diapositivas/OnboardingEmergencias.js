import Diapositiva from '../componentes/Diapositiva';
import IlustracionEmergencias from '../ilustraciones/IlustracionEmergencias';

export default function OnboardingEmergencias({ ancho, alto }) {
  return (
    <Diapositiva
      ancho={ancho}
      alto={alto}
      ilustracion={<IlustracionEmergencias />}
      titulo="Respuesta ante emergencias"
      descripcion="Consulta recomendaciones sobre qué hacer y comparte reportes vecinales con fecha, hora y zona aproximada."
      puntos={['Inseguridad ciudadana', 'Sismos y El Niño']}
      nota="Los reportes son vecinales, no alertas oficiales. La app no reemplaza a la Policía ni a los servicios de emergencia."
    />
  );
}
