// [lng, lat]. Coordenadas de ejemplo: cámbialas por la zona real.
export const INITIAL_CENTER = [-77.03, -12.046];
export const INITIAL_ZOOM = 14.5;
export const CURRENCY = 'S/';
export const formatPrice = (n) => `${CURRENCY} ${n.toFixed(2)}`;
export const directionsUrl = (lng, lat) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
