import { Path, Rect } from 'react-native-svg';
import Lienzo from './Lienzo';
import { COLORES as C } from '../tema';

export default function IlustracionEconomiaSolidaria() {
  return (
    <Lienzo>
      <Rect x={20} y={60} width={70} height={70} rx={16} fill={C.marca100} />
      <Path d="M40 108 C40 82 62 74 72 76 C74 98 62 112 40 108 Z" fill={C.marca300} />
      <Path d="M42 106 L62 86" />
      <Rect x={170} y={70} width={70} height={70} rx={16} fill={C.marca100} />
      <Rect x={190} y={98} width={30} height={28} rx={5} fill={C.blanco} />
      <Path d="M197 98 v-6 a8 8 0 0 1 16 0 v6" />
      <Path d="M100 82 H150" stroke={C.marca600} strokeWidth={4} />
      <Path d="M142 74 L150 82 L142 90" stroke={C.marca600} strokeWidth={4} />
      <Path d="M160 120 H110" />
      <Path d="M118 112 L110 120 L118 128" />
      <Path d="M130 176 C112 164 114 150 124 150 C128 150 130 153 130 155 C130 153 132 150 136 150 C146 150 148 164 130 176 Z" fill={C.marca600} />
    </Lienzo>
  );
}
