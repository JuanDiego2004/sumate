import { StyleSheet, View } from 'react-native';
import { createContext, memo, useContext, useEffect } from 'react';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Circle, G, Path, Rect } from 'react-native-svg';
import Lienzo from './Lienzo';
import { COLORES as C } from '../tema';

/*
 * Ilustración animada "Economía local" (onboarding).
 *
 * Cómo funciona: cada pieza del dibujo vive en su propia CAPA (un Animated.View
 * que cubre todo el lienzo). Así Reanimated anima transformaciones reales
 * (scale, translate, rotate) con el punto de giro/escala que yo elija.
 *
 * Línea de tiempo (ms):
 *    0  suelo se extiende
 *  250  la tienda "crece" desde el suelo
 *  450  la puerta aparece (luego se abre y cierra en bucle)
 *  800  el toldo cae con rebote (luego se mece)
 * 1200  el pin cae del cielo (luego flota y emite ondas)
 * 1300+ aparecen las chispas (luego titilan)
 * 2200+ salen monedas de la tienda hacia arriba
 */

// Debe coincidir con el viewBox de tu <Lienzo>. Si es otro, cámbialo aquí.
const ANCHO = 260;
const ALTO = 200;
const AnimacionActiva = createContext(true);

const origenCss = (x, y) => `${(x / ANCHO) * 100}% ${(y / ALTO) * 100}%`;

const valorAngulo = (valor) => {
    if (typeof valor === 'number') return valor;
    return Number.parseFloat(valor) || 0;
};

const valorAnimable = (propiedad, valor) =>
    propiedad === 'rotate' ? valorAngulo(valor) : valor;

function crearAnimacion(propiedad, objetivo, configuracion) {
    const duracion = configuracion.duration ?? 300;
    const opcionesTiming = {
        duration: duracion,
        easing: Easing.inOut(Easing.ease),
    };
    const animarValor = (valor, duracionActual = duracion) => {
        const destino = valorAnimable(propiedad, valor);

        if (configuracion.type === 'spring') {
            return withSpring(destino, {
                damping: configuracion.damping,
                stiffness: configuracion.stiffness,
                mass: configuracion.mass,
            });
        }

        return withTiming(destino, {
            ...opcionesTiming,
            duration: duracionActual,
        });
    };

    let animacion;
    if (Array.isArray(objetivo)) {
        const duracionPorPaso = duracion / Math.max(objetivo.length, 1);
        animacion = withSequence(
            ...objetivo.map((valor) => animarValor(valor, duracionPorPaso))
        );
    } else {
        animacion = animarValor(objetivo);
    }

    if (configuracion.loop) {
        animacion = withRepeat(animacion, -1, configuracion.repeatReverse !== false);
    }

    if (configuracion.delay) {
        animacion = withDelay(configuracion.delay, animacion);
    }

    return animacion;
}

/** Capa animable: cubre todo el lienzo y gira/escala desde `origen` [x, y] (coordenadas del dibujo). */
function Capa({
    origen = [ANCHO / 2, ALTO / 2],
    from = {},
    animate = {},
    transition = {},
    children,
    ...viewProps
}) {
    const activa = useContext(AnimacionActiva);
    const opacity = useSharedValue(from.opacity ?? 1);
    const scale = useSharedValue(from.scale ?? 1);
    const scaleX = useSharedValue(from.scaleX ?? 1);
    const scaleY = useSharedValue(from.scaleY ?? 1);
    const translateX = useSharedValue(from.translateX ?? 0);
    const translateY = useSharedValue(from.translateY ?? 0);
    const rotate = useSharedValue(valorAngulo(from.rotate ?? '0deg'));
    const animatesOpacity = Object.hasOwn(animate, 'opacity');
    const animatesScale = Object.hasOwn(animate, 'scale');
    const animatesScaleX = Object.hasOwn(animate, 'scaleX');
    const animatesScaleY = Object.hasOwn(animate, 'scaleY');
    const animatesTranslateX = Object.hasOwn(animate, 'translateX');
    const animatesTranslateY = Object.hasOwn(animate, 'translateY');
    const animatesRotate = Object.hasOwn(animate, 'rotate');

    const animatedStyle = useAnimatedStyle(() => ({
        ...(animatesOpacity ? { opacity: opacity.value } : {}),
        transform: [
            ...(animatesTranslateX ? [{ translateX: translateX.value }] : []),
            ...(animatesTranslateY ? [{ translateY: translateY.value }] : []),
            ...(animatesScaleX ? [{ scaleX: scaleX.value }] : []),
            ...(animatesScaleY ? [{ scaleY: scaleY.value }] : []),
            ...(animatesScale ? [{ scale: scale.value }] : []),
            ...(animatesRotate ? [{ rotate: `${rotate.value}deg` }] : []),
        ],
    }));

    useEffect(() => {
        if (!activa) return;
        const valores = { opacity, scale, scaleX, scaleY, translateX, translateY, rotate };
        const configuracionBase = transition.default ?? transition;

        for (const [propiedad, objetivo] of Object.entries(animate)) {
            const configuracion = transition[propiedad] ?? configuracionBase;
            const retraso = configuracion.delay ?? 0;
            valores[propiedad].value = crearAnimacion(propiedad, objetivo, {
                ...configuracion,
                delay: retraso,
            });
        }
        return () => Object.values(valores).forEach(cancelAnimation);
    }, [activa, animate, opacity, rotate, scale, scaleX, scaleY, transition, translateX, translateY]);

    return (
        <Animated.View
            {...viewProps}
            pointerEvents="none"
            style={[
                StyleSheet.absoluteFill,
                { transformOrigin: origenCss(origen[0], origen[1]) },
                viewProps.style,
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    );
}

/** Dibujo SVG de una capa (usa tu Lienzo para heredar trazo, grosor, etc.). */
function Dibujo({ children }) {
    return <Lienzo>{children}</Lienzo>;
}

/** Estrellita que aparece girando y luego titila sin parar. */
function Destello({ cx, cy, escala = 1, retraso = 0, color = C.marca300 }) {
    // La estrella original está centrada en (28, 50)
    const mover = `translate(${cx - 28 * escala} ${cy - 50 * escala}) scale(${escala})`;

    return (
        <Capa
            origen={[cx, cy]}
            from={{ scale: 0, rotate: '-90deg', opacity: 0 }}
            animate={{ scale: 1, rotate: '0deg', opacity: 1 }}
            transition={{ type: 'spring', damping: 11, delay: retraso }}
        >
            <Capa
                origen={[cx, cy]}
                from={{ scale: 1, rotate: '0deg' }}
                animate={{ scale: 0.55, rotate: '25deg' }}
                transition={{ type: 'timing', duration: 900 + retraso % 400, loop: true, delay: retraso + 700 }}
            >
                <Dibujo>
                    <G transform={mover}>
                        <Path
                            d="M28 36 L32 46 L42 50 L32 54 L28 64 L24 54 L14 50 L24 46 Z"
                            fill={color}
                        />
                    </G>
                </Dibujo>
            </Capa>
        </Capa>
    );
}

/** Moneda que sale de la tienda, sube y se desvanece (en bucle). */
function Moneda({ x, retraso = 0 }) {
    return (
        <Capa
            origen={[x, 62]}
            from={{ translateY: 0, translateX: 0, scale: 0.6, opacity: 0 }}
            animate={{ translateY: -50, translateX: 12, scale: 1, opacity: [0, 1, 1, 0] }}
            transition={{
                translateY: { type: 'timing', duration: 2100, loop: true, repeatReverse: false, delay: retraso },
                translateX: { type: 'timing', duration: 2100, loop: true, repeatReverse: false, delay: retraso },
                scale: { type: 'timing', duration: 2100, loop: true, repeatReverse: false, delay: retraso },
                opacity: { type: 'timing', duration: 525, loop: true, repeatReverse: false, delay: retraso },
            }}
        >
            <Dibujo>
                <Circle cx={x} cy={62} r={7} fill={C.marca300} />
                <Circle cx={x} cy={62} r={3.2} fill="none" />
            </Dibujo>
        </Capa>
    );
}

export default function IlustracionEconomiaLocal({ activa = true }) {
    return (
        <AnimacionActiva.Provider value={activa}>
            <DibujoEconomiaLocal />
        </AnimacionActiva.Provider>
    );
}

const DibujoEconomiaLocal = memo(function DibujoEconomiaLocal() {
    return (
        <View style={{ width: '100%', aspectRatio: ANCHO / ALTO }}>
            {/* 1. Suelo: se extiende desde el centro */}
            <Capa
                origen={[130, 176]}
                from={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ type: 'timing', duration: 600 }}
            >
                <Dibujo>
                    <Path d="M30 176 H230" />
                </Dibujo>
            </Capa>

            {/* 2. Cuerpo de la tienda: crece desde el suelo (incluye interior y ventana) */}
            <Capa
                origen={[118, 176]}
                from={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 13, delay: 250 }}
            >
                <Dibujo>
                    <Rect x={60} y={96} width={116} height={80} rx={6} fill={C.blanco} />
                    {/* interior que se ve cuando la puerta se abre */}
                    <Rect x={86} y={126} width={34} height={50} rx={4} fill={C.marca600} opacity={0.35} />
                    <Rect x={132} y={118} width={30} height={28} rx={4} fill={C.marca100} />
                </Dibujo>
            </Capa>

            {/* 3. Luz de la ventana: parpadea suave */}
            <Capa
                from={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ type: 'timing', duration: 1400, loop: true, delay: 1800 }}
            >
                <Dibujo>
                    <Rect x={132} y={118} width={30} height={28} rx={4} fill={C.marca300} />
                </Dibujo>
            </Capa>

            {/* 4. Puerta: aparece y luego se abre/cierra como dando la bienvenida */}
            <Capa
                origen={[86, 176]}
                from={{ scaleY: 0, scaleX: 1, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1, scaleX: [1, 1, 0.3, 0.3, 0.3, 1] }}
                transition={{
                    default: { type: 'spring', damping: 14, delay: 450 },
                    scaleX: { type: 'timing', duration: 450, loop: true, repeatReverse: false, delay: 2600 },
                }}
            >
                <Dibujo>
                    <Rect x={86} y={126} width={34} height={50} rx={4} fill={C.marca300} />
                    <Circle cx={113} cy={153} r={2.5} fill={C.blanco} />
                </Dibujo>
            </Capa>

            {/* 5. Monedas que salen de la tienda (van detrás del toldo) */}
            <Moneda x={108} retraso={2200} />
            <Moneda x={146} retraso={3250} />

            {/* 6. Toldo: cae con rebote y luego se mece desde arriba */}
            <Capa
                origen={[118, 60]}
                from={{ translateY: -60, opacity: 0, rotate: '0deg' }}
                animate={{ translateY: 0, opacity: 1, rotate: ['0deg', '1.5deg', '0deg', '-1.5deg', '0deg'] }}
                transition={{
                    default: { type: 'spring', damping: 8, stiffness: 140, delay: 800 },
                    rotate: { type: 'timing', duration: 1100, loop: true, repeatReverse: false, delay: 2200 },
                }}
            >
                <Dibujo>
                    <Path d="M52 96 L64 60 H172 L184 96 Z" fill={C.marca100} />
                    <Path
                        d="M52 96 q16.5 18 33 0 q16.5 18 33 0 q16.5 18 33 0 q16.5 18 33 0 Z"
                        fill={C.marca600}
                    />
                </Dibujo>
            </Capa>

            {/* 7. Onda tipo radar detrás del pin */}
            <Capa
                origen={[218, 48]}
                from={{ scale: 0.6, opacity: 0.7 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{
                    type: 'timing',
                    duration: 1800,
                    loop: true,
                    repeatReverse: false,
                    delay: 1700,
                }}
            >
                <Dibujo>
                    <Circle cx={218} cy={48} r={18} fill="none" stroke={C.marca300} strokeWidth={3} />
                </Dibujo>
            </Capa>

            {/* 8. Pin de ubicación: cae del cielo y luego flota */}
            <Capa
                from={{ translateY: -110, opacity: 0, scale: 0.7 }}
                animate={{ translateY: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 7, stiffness: 120, delay: 1200 }}
            >
                <Capa
                    from={{ translateY: 0 }}
                    animate={{ translateY: -8 }}
                    transition={{ type: 'timing', duration: 1100, loop: true, delay: 2200 }}
                >
                    <Dibujo>
                        <Path
                            d="M218 80 C206 64 200 56 200 48 a18 18 0 0 1 36 0 c0 8 -6 16 -18 32 Z"
                            fill={C.marca600}
                        />
                        <Circle cx={218} cy={48} r={6} fill={C.blanco} />
                    </Dibujo>
                </Capa>
            </Capa>

            {/* 9. Chispas (la original + dos extra) */}
            <Destello cx={28} cy={50} escala={1} retraso={1300} />
            <Destello cx={238} cy={116} escala={0.6} retraso={1700} color={C.marca600} />
            <Destello cx={36} cy={118} escala={0.5} retraso={2000} />
        </View>
    );
});
