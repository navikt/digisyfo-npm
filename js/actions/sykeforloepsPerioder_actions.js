import * as actiontyper from '../actions/actiontyper';

export const hentSykeforloepsPerioder = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENT_SYKEFORLOEPSPERIODER_FORESPURT,
        fnr,
        virksomhetsnummer,
    };
};

export const henterSykeforloepsPerioder = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENTER_SYKEFORLOEPSPERIODER,
        fnr,
        virksomhetsnummer,
    };
};

export const sykeforloepsPerioderHentet = (periodeListe, fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.SYKEFORLOEPSPERIODER_HENTET,
        periodeListe,
        fnr,
        virksomhetsnummer,
    };
};

export const hentSykeforloepsPerioderFeilet = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENT_SYKEFORLOEPSPERIODER_FEILET,
        fnr,
        virksomhetsnummer,
    };
};
