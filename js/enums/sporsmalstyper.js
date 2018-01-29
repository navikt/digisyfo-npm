import {
    aktiviteter,
    ansvarBekreftet,
    arbeidsgiverForskutterer,
    bruktEgenmeldingsdagerFoerLegemeldtFravaer,
    harAndreInntektskilder,
    harGjenopptattArbeidFulltUt,
    harHattFeriePermisjonEllerUtenlandsopphold,
    underUtdanningISykmeldingsperioden,
} from './sykepengesoknadskjemafelter';

const sporsmalstyper = {};

export const ansvarBekreftetType = 'ANSVAR_BEKREFTET';
export const egenmeldingsdagerType = 'EGENMELDINGSDAGER';
export const gjenopptattArbeidFulltUtType = 'GJENOPPTATT_ARBEID_FULLT_UT';
export const feriePermisjonUtenlandsoppholdType = 'FERIE_PERMISJON_UTENLANDSOPPHOLD';
export const aktiviteterType = 'AKTIVITET';
export const inntektskilderType = 'INNTEKTSKILDER';
export const utdanningType = 'UTDANNING';
export const arbeidsgiverForskuttererType = 'ARBEIDSGIVER_FORSKUTTERER';

sporsmalstyper[ansvarBekreftet] = ansvarBekreftetType;
sporsmalstyper[bruktEgenmeldingsdagerFoerLegemeldtFravaer] = egenmeldingsdagerType;
sporsmalstyper[harGjenopptattArbeidFulltUt] = gjenopptattArbeidFulltUtType;
sporsmalstyper[harHattFeriePermisjonEllerUtenlandsopphold] = feriePermisjonUtenlandsoppholdType;
sporsmalstyper[aktiviteter] = aktiviteterType;
sporsmalstyper[harAndreInntektskilder] = inntektskilderType;
sporsmalstyper[underUtdanningISykmeldingsperioden] = utdanningType;
sporsmalstyper[arbeidsgiverForskutterer] = arbeidsgiverForskuttererType;

export default sporsmalstyper;
