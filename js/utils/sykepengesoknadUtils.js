import { tidligsteFom, senesteTom } from './periodeUtils';

export const getTomDato = (sykepengesoknad) => {
    const perioder = sykepengesoknad.aktiviteter.map((a) => {
        return a.periode;
    });
    if (sykepengesoknad.gjenopptattArbeidFulltUtDato) {
        const t = new Date(tidligsteFom(perioder));
        const g = new Date(sykepengesoknad.gjenopptattArbeidFulltUtDato);
        if (g.getTime() === t.getTime()) {
            return g;
        }
        return new Date(g - (1000 * 60 * 60 * 24));
    }
    return senesteTom(perioder);
};
