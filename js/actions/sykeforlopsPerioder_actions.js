import * as actiontyper from '../actions/actiontyper';

export const hentSYKEFORLOPSPERIODER = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENT_SYKEFORLOPSPERIODER_FORESPURT,
        fnr,
        virksomhetsnummer,
    };
};

export const henterSYKEFORLOPSPERIODER = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENTER_SYKEFORLOPSPERIODER,
        fnr,
        virksomhetsnummer,
    };
};

export const SYKEFORLOPSPERIODERHentet = (periodeListe, fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.SYKEFORLOPSPERIODER_HENTET,
        periodeListe,
        fnr,
        virksomhetsnummer,
    };
};

export const hentSYKEFORLOPSPERIODERFeilet = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENT_SYKEFORLOPSPERIODER_FEILET,
        fnr,
        virksomhetsnummer,
    };
};
