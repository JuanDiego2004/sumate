import Svg, { G } from 'react-native-svg';
import { COLORES } from '../tema';

export default function Lienzo({ children, alto = 220 }) {
  return (
    <Svg width="100%" height={alto} viewBox="0 0 260 200">
      <G
        fill="none"
        stroke={COLORES.tinta}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </G>
    </Svg>
  );
}
