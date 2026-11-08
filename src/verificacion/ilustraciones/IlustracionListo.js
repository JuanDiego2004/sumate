import { Circle, Path } from 'react-native-svg';
import Lienzo from '../../onboarding/ilustraciones/Lienzo';
import { COLORES as C } from '../../onboarding/tema';

export default function IlustracionListo() {
  return (
    <Lienzo alto={170}>
      <Circle cx={130} cy={100} r={62} fill={C.marca100} stroke="none" />
      <Circle cx={130} cy={100} r={44} fill={C.marca600} />
      <Path d="M110 100 L125 115 L152 86" stroke={C.blanco} strokeWidth={7} />
      <Path d="M42 52 L45 60 L53 63 L45 66 L42 74 L39 66 L31 63 L39 60 Z" fill={C.marca300} />
      <Path d="M214 140 L217 148 L225 151 L217 154 L214 162 L211 154 L203 151 L211 148 Z" fill={C.marca300} />
      <Circle cx={206} cy={46} r={5} fill={C.marca600} stroke="none" />
      <Circle cx={56} cy={146} r={4} fill={C.marca600} stroke="none" />
    </Lienzo>
  );
}
