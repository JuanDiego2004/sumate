import { Circle, Path } from 'react-native-svg';
import Lienzo from './Lienzo';
import { COLORES as C } from '../tema';

export default function IlustracionEmergencias() {
  return (
    <Lienzo>
      <Circle cx={130} cy={100} r={70} />
      <Path d="M130 52 L168 66 V100 C168 124 152 140 130 150 C108 140 92 124 92 100 V66 Z" fill={C.marca600} />
      <Path d="M130 78 V106" stroke={C.blanco} strokeWidth={5} />
      <Path d="M130 122 V122.5" stroke={C.blanco} strokeWidth={6} />
      <Path d="M214 34 C214 34 202 48 202 56 a12 12 0 0 0 24 0 C226 48 214 34 214 34 Z" fill={C.marca300} />
      <Path d="M24 182 H74 L84 166 L96 196 L106 174 L114 182 H236" stroke={C.marca600} />
    </Lienzo>
  );
}
