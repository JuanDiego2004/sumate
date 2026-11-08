import { Circle, Path, Rect } from 'react-native-svg';
import Lienzo from './Lienzo';
import { COLORES as C } from '../tema';

function estrella(cx, cy, R) {
  const r = R * 0.45;
  const puntos = [];
  for (let i = 0; i < 10; i++) {
    const radio = i % 2 === 0 ? R : r;
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    puntos.push(`${(cx + radio * Math.cos(ang)).toFixed(1)} ${(cy + radio * Math.sin(ang)).toFixed(1)}`);
  }
  return `M${puntos.join(' L')} Z`;
}

export default function IlustracionConfianza() {
  return (
    <Lienzo>
      <Rect x={40} y={56} width={180} height={104} rx={18} fill={C.blanco} />
      {[74, 102, 130, 158, 186].map((x, i) => (
        <Path key={x} d={estrella(x, 92, 11)} strokeWidth={2.5} fill={i < 4 ? C.marca300 : C.blanco} />
      ))}
      <Path d="M64 124 H140" stroke={C.marca300} strokeWidth={5} />
      <Path d="M64 142 H110" stroke={C.marca300} strokeWidth={5} />
      <Circle cx={214} cy={56} r={20} fill={C.marca600} />
      <Path d="M205 56 L211 62 L223 49" stroke={C.blanco} strokeWidth={4} />
      <Path d="M28 164 L31 172 L39 175 L31 178 L28 186 L25 178 L17 175 L25 172 Z" fill={C.marca300} />
    </Lienzo>
  );
}
