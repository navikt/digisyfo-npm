import { tidligsteFom, senesteTom, periodeOverlapperMedPeriode } from './periodeUtils';
import { erGyldigDatoformat, fraInputdatoTilJSDato } from './datoUtils';


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

export const finnFomForFeriesporsmal = (sykepengesoknad) => {
    const { forrigeSykeforloepTom, forrigeSendteSoknadTom } = sykepengesoknad;

    if (forrigeSykeforloepTom !== null && forrigeSendteSoknadTom !== null) {
        if (forrigeSendteSoknadTom >= forrigeSykeforloepTom) {
            return sykepengesoknad.fom;
        }
    }

    return forrigeSykeforloepTom || sykepengesoknad.fom;
};

export const mapAktiviteter = (soknad) => {
    const aktiviteter = soknad.aktiviteter
        .filter((aktivitet) => {
            return periodeOverlapperMedPeriode(aktivitet.periode, {
                fom: soknad.fom,
                tom: soknad.tom,
            });
        })
        .map((aktivitet) => {
            const fom = aktivitet.periode.fom.getTime() < soknad.fom.getTime() ? soknad.fom : aktivitet.periode.fom;
            const tom = aktivitet.periode.tom.getTime() > soknad.tom.getTime() ? soknad.tom : aktivitet.periode.tom;
            return {
                ...aktivitet,
                periode: { fom, tom },
            };
        });
    return {
        ...soknad,
        aktiviteter,
    };
};

export const getGjenopptattArbeidFulltUtDato = (skjemasoknad) => {
    let gjenopptattArbeidFulltUtDato = skjemasoknad.gjenopptattArbeidFulltUtDato;
    if (!skjemasoknad.harGjenopptattArbeidFulltUt || !gjenopptattArbeidFulltUtDato || !erGyldigDatoformat(gjenopptattArbeidFulltUtDato)) {
        gjenopptattArbeidFulltUtDato = null;
    } else {
        try {
            gjenopptattArbeidFulltUtDato = fraInputdatoTilJSDato(gjenopptattArbeidFulltUtDato);
        } catch (e) {
            gjenopptattArbeidFulltUtDato = null;
        }
        if (gjenopptattArbeidFulltUtDato && isNaN(gjenopptattArbeidFulltUtDato.getTime())) {
            gjenopptattArbeidFulltUtDato = null;
        }
    }
    return gjenopptattArbeidFulltUtDato;
};
