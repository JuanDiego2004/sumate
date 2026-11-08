import PasoDniFrente from './PasoDniFrente';
import PasoDniReverso from './PasoDniReverso';
import PasoIntroduccion from './PasoIntroduccion';
import PasoNumeroDni from './PasoNumeroDni';
import PasoResultado from './PasoResultado';
import PasoSelfie from './PasoSelfie';

// El orden de este arreglo es el orden de la verificación.
export const PASOS = [
  PasoIntroduccion,
  PasoNumeroDni,
  PasoDniFrente,
  PasoDniReverso,
  PasoSelfie,
  PasoResultado,
];
