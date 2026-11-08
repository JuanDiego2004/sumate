import { Circle, Path, Rect } from 'react-native-svg';
import Lienzo from '../../onboarding/ilustraciones/Lienzo';
import { COLORES as C } from '../../onboarding/tema';

// DNI + marco de escaneo facial.
export default function IlustracionVerificacion() {
  return (
    <Lienzo alto={170}>
      {/* documento */}
      <Rect x={26} y={54} width={132} height={86} rx={12} fill={C.blanco} />
      <Rect x={40} y={70} width={36} height={44} rx={8} fill={C.marca100} />
      <Circle cx={58} cy={86} r={8} fill={C.marca300} />
      <Path d="M44 112 q14 -16 28 0" />
      <Path d="M90 80 H144" stroke={C.marca300} strokeWidth={5} />
      <Path d="M90 96 H136" stroke={C.marca300} strokeWidth={5} />
      <Path d="M90 112 H126" stroke={C.marca300} strokeWidth={5} />
      {/* marco de escaneo */}
      <Circle cx={190} cy={122} r={20} fill={C.marca100} />
      <Circle cx={183} cy={118} r={1.5} fill={C.tinta} />
      <Circle cx={197} cy={118} r={1.5} fill={C.tinta} />
      <Path d="M182 128 q8 7 16 0" />
      <Path d="M150 98 V92 a10 10 0 0 1 10 -10 H166" stroke={C.marca600} strokeWidth={4} />
      <Path d="M214 82 H220 a10 10 0 0 1 10 10 V98" stroke={C.marca600} strokeWidth={4} />
      <Path d="M230 146 V152 a10 10 0 0 1 -10 10 H214" stroke={C.marca600} strokeWidth={4} />
      <Path d="M166 162 H160 a10 10 0 0 1 -10 -10 V146" stroke={C.marca600} strokeWidth={4} />
      {/* destello */}
      <Path d="M44 164 L47 172 L55 175 L47 178 L44 186 L41 178 L33 175 L41 172 Z" fill={C.marca300} />
    </Lienzo>
  );
}
