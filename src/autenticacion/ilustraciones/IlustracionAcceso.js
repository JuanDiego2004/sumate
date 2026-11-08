import { Path, Rect } from 'react-native-svg';
import Lienzo from '../../onboarding/ilustraciones/Lienzo';
import { COLORES as C } from '../../onboarding/tema';

// Tres casas conectadas por un corazón: la comunidad.
export default function IlustracionAcceso() {
  return (
    <Lienzo alto={170}>
      <Path d="M10 176 H250" />
      {/* casa izquierda */}
      <Rect x={22} y={128} width={58} height={48} fill={C.blanco} />
      <Path d="M16 130 L51 104 L86 130 Z" fill={C.marca300} />
      <Rect x={44} y={150} width={14} height={26} rx={3} fill={C.marca100} />
      {/* casa derecha */}
      <Rect x={180} y={128} width={58} height={48} fill={C.blanco} />
      <Path d="M174 130 L209 104 L244 130 Z" fill={C.marca300} />
      <Rect x={202} y={150} width={14} height={26} rx={3} fill={C.marca100} />
      {/* casa central */}
      <Rect x={95} y={108} width={70} height={68} fill={C.blanco} />
      <Path d="M87 112 L130 76 L173 112 Z" fill={C.marca600} />
      <Rect x={121} y={140} width={18} height={36} rx={3} fill={C.marca300} />
      <Rect x={104} y={120} width={12} height={12} rx={2} fill={C.marca100} />
      <Rect x={144} y={120} width={12} height={12} rx={2} fill={C.marca100} />
      {/* vínculo entre vecinos */}
      <Path d="M51 98 Q58 52 110 44" strokeDasharray="1 8" stroke={C.marca600} />
      <Path d="M209 98 Q202 52 150 44" strokeDasharray="1 8" stroke={C.marca600} />
      <Path
        d="M130 58 C114 48 116 32 126 32 C130 32 130 36 130 38 C130 36 132 32 136 32 C146 32 146 48 130 58 Z"
        fill={C.marca600}
      />
    </Lienzo>
  );
}
