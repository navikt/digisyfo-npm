import { getLedetekst } from '../ledetekster';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getGjenopptattArbeidFulltUtDato } from '../utils/sykepengesoknadUtils';
import {
    getAktivitetssporsmal,
    getFeriePermisjonEllerUtenlandsoppholdSporsmal,
    getInntektskildeLabel,
    getTotalJobbingSporsmal,
    getUtdanningssporsmal,
} from '../utils/sykepengesoknadSporsmal';
import { CHECKBOX, DATO, DATOSPENN, HTML, RADIOKNAPPER, TEKSTSVAR } from '../enums/sykepengesoknadsvartyper';
import { ANNET } from '../enums/inntektskildetyper';
import * as skjemafelter from '../enums/sykepengesoknadskjemafelter';
import sporsmalstyper from '../enums/sporsmalstyper';
import { senesteTom } from '../utils';

const {
    ansvarBekreftet,
    bruktEgenmeldingsdagerFoerLegemeldtFravaer,
    egenmeldingsperioder,
    harGjenopptattArbeidFulltUt,
    gjenopptattArbeidFulltUtDato,
    harHattFeriePermisjonEllerUtenlandsopphold,
    harHattFerie,
    harHattPermisjon,
    harHattUtenlandsopphold,
    utenlandsoppholdSoektOmSykepengerIPerioden,
    aktiviteter,
    normalArbeidstimerPerUke,
    harAndreInntektskilder,
    andreInntektskilder,
    underUtdanningISykmeldingsperioden,
    utdanningStartdato,
    erUtdanningFulltidsstudium,
    bekreftetKorrektInformasjon,
    ansvarserklaring,
    arbeidsgiverForskutterer,
} = skjemafelter;

const jegHar = 'jegHar';

const hovedsporsmalsliste = [
    bruktEgenmeldingsdagerFoerLegemeldtFravaer,
    harGjenopptattArbeidFulltUt,
    harHattFeriePermisjonEllerUtenlandsopphold,
    aktiviteter,
    harAndreInntektskilder,
    underUtdanningISykmeldingsperioden,
    arbeidsgiverForskutterer,
    ansvarBekreftet,
];

const nokler = {};
nokler[ansvarBekreftet] = 'sykepengesoknad.bekreft-ansvar.label';
nokler[bruktEgenmeldingsdagerFoerLegemeldtFravaer] = 'sykepengesoknad.egenmeldingsdager.janei.sporsmal';
nokler[egenmeldingsperioder] = 'sykepengesoknad.egenmeldingsdager.dato.sporsmal';
nokler[harGjenopptattArbeidFulltUt] = 'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal-2';
nokler[gjenopptattArbeidFulltUtDato] = 'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.dato.sporsmal';
nokler[harHattFeriePermisjonEllerUtenlandsopphold] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal';
nokler[harHattFerie] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie';
nokler[harHattUtenlandsopphold] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge';
nokler[jegHar] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har';
nokler[harHattPermisjon] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon';
nokler[utenlandsoppholdSoektOmSykepengerIPerioden] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal';
nokler.aktiviteterGradert = 'sykepengesoknad.aktiviteter.gradert.spoersmal-2';
nokler.aktiviteterUgradert = 'sykepengesoknad.aktiviteter.ugradert.spoersmal-2';

nokler[normalArbeidstimerPerUke] = 'sykepengesoknad.angi-tid.normal-arbeidstimer.sporsmal';
nokler.normalArbeidstimerPerUkeSvar = 'sykepengesoknad.angi-tid.normal-arbeidstimer.label-med-verdi';
nokler.totalJobbing = 'sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet-totalt';
nokler.angiArbeidsgrad = 'sykepengesoknad.angi-tid.velg-enhet.label.prosent-med-verdi';
nokler.angiArbeidstimer = 'sykepengesoknad.angi-tid.velg-enhet.label.timer-med-verdi';
nokler.detteTilsvarer = 'sykepengesoknad.angi-tid.dette-tilsvarer';
nokler[andreInntektskilder] = 'sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.sporsmal';
nokler[harAndreInntektskilder] = 'sykepengesoknad.andre-inntektskilder.janei.sporsmal';
nokler.erDuSykmeldtFraInntektskilde = 'sykepengesoknad.andre-inntektskilder.er-du-sykmeldt-fra-dette.sporsmal';
nokler[utdanningStartdato] = 'sykepengesoknad.utdanning.startdato.sporsmal';
nokler[erUtdanningFulltidsstudium] = 'sykepengesoknad.utdanning.fulltidsstudium.sporsmal';
nokler.arbeidsgiverForskuttererSvarJA = 'sykepengesoknad.forskutterer-arbeidsgiver.svar.JA';
nokler.arbeidsgiverForskuttererSvarNEI = 'sykepengesoknad.forskutterer-arbeidsgiver.svar.NEI';
nokler.arbeidsgiverForskuttererSvarVET_IKKE = 'sykepengesoknad.forskutterer-arbeidsgiver.svar.VET_IKKE';
nokler[arbeidsgiverForskutterer] = 'sykepengesoknad.forskutterer-arbeidsgiver.sporsmal';
nokler.periode = 'sykepengesoknad.oppsummering.periode.fra-til';
nokler.dato = 'sykepengesoknad.dato';
nokler.ja = 'sykepengesoknad.ja';
nokler.nei = 'sykepengesoknad.nei';
nokler[ansvarserklaring] = 'sykepengesoknad.oppsummering.vaer-klar-over-at';
nokler[bekreftetKorrektInformasjon] = 'sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label';

const getNokkelOgVerdier = (nokkel, verdier) => {
    const tekst = getLedetekst(nokkel, verdier);
    if (verdier) {
        return {
            nokkel, verdier, tekst,
        };
    }
    return { nokkel, tekst };
};

const getSporsmalsledetekst = (felt, sykepengesoknad, skjemasoknad) => {
    const nokkel = nokler[felt];
    switch (felt) {
        case bruktEgenmeldingsdagerFoerLegemeldtFravaer: {
            return getNokkelOgVerdier(nokkel, {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.identdato),
            });
        }
        case harGjenopptattArbeidFulltUt:
            const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
                return aktivitet.periode;
            });
            return getNokkelOgVerdier(nokkel, {
                '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
                '%DATO%': toDatePrettyPrint(senesteTom(perioder)),
            });
        case harAndreInntektskilder: {
            return getNokkelOgVerdier(nokkel, {
                '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
            });
        }
        case harHattFeriePermisjonEllerUtenlandsopphold: {
            const _gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
            return getFeriePermisjonEllerUtenlandsoppholdSporsmal(sykepengesoknad, _gjenopptattArbeidFulltUtDato, getNokkelOgVerdier);
        }
        case underUtdanningISykmeldingsperioden: {
            const _gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
            return getUtdanningssporsmal(sykepengesoknad, _gjenopptattArbeidFulltUtDato, getNokkelOgVerdier);
        }
        default: {
            return getNokkelOgVerdier(nokkel);
        }
    }
};

const tilPeriode = ({ fom, tom }) => {
    const verdier = {
        '%FOM%': fom,
        '%TOM%': tom,
    };

    return {
        ledetekst: {
            nokkel: nokler.periode,
            verdier,
            tekst: getLedetekst(nokler.periode, verdier),
        },
        type: DATOSPENN,
        undersporsmal: [],
    };
};

export const Tilleggstekst = function (ledetekst, type) {
    this.ledetekst = ledetekst;
    this.type = type;
};

export const Sporsmal = function (ledetekst, svar, type) {
    this.ledetekst = ledetekst;
    this.svar = svar;
    if (type) {
        this.type = type;
    }
};

export const Svar = function (ledetekst, type = TEKSTSVAR, undersporsmal = [], tilleggstekst) {
    this.ledetekst = ledetekst;
    this.type = type;
    this.undersporsmal = undersporsmal;

    if (tilleggstekst) {
        this.tilleggstekst = tilleggstekst;
    }
};

const getJaEllerNeiSvar = (bool, undersporsmal) => {
    const ledetekst = bool ? getNokkelOgVerdier(nokler.ja) : getNokkelOgVerdier(nokler.nei);
    return [new Svar(ledetekst, RADIOKNAPPER, undersporsmal)];
};

const tilEgenmeldingFoerLegemeldt = (skjemasoknad, sykepengesoknad, felt) => {
    const undersporsmalEgenmeldingsperioder = new Sporsmal(null, skjemasoknad.egenmeldingsperioder.map(tilPeriode));
    return new Sporsmal(
        getSporsmalsledetekst(felt, sykepengesoknad, skjemasoknad),
        getJaEllerNeiSvar(Object.byString(skjemasoknad, felt), [undersporsmalEgenmeldingsperioder]),
        sporsmalstyper[felt],
    );
};

const tilGjenopptattArbeidFulltUt = (skjemasoknad, sykepengesoknad, felt) => {
    const verdier = {
        '%DATO%': skjemasoknad[gjenopptattArbeidFulltUtDato],
    };
    const undersporsmalGjenopptattArbeid = new Sporsmal(null, [new Svar(getNokkelOgVerdier(nokler.dato, verdier), DATO)]);
    return new Sporsmal(
        getSporsmalsledetekst(felt, sykepengesoknad, skjemasoknad),
        getJaEllerNeiSvar(Object.byString(skjemasoknad, felt), [undersporsmalGjenopptattArbeid]),
        sporsmalstyper[felt],
    );
};

const tilFeriePermisjonOgUtenlandsopphold = (skjemasoknad, sykepengesoknad, felt) => {
    const utenlandsopphold = (() => {
        if (!skjemasoknad.harHattUtenlandsopphold) {
            return null;
        }
        const utenlandsoppholdperiodersporsmal = new Sporsmal(null, skjemasoknad.utenlandsopphold.perioder.map(tilPeriode));
        const utenlandsoppholdSoektSporsmal = new Sporsmal(
            getSporsmalsledetekst(utenlandsoppholdSoektOmSykepengerIPerioden),
            getJaEllerNeiSvar(skjemasoknad.utenlandsopphold.soektOmSykepengerIPerioden));
        return new Svar(getNokkelOgVerdier(nokler[harHattUtenlandsopphold]), RADIOKNAPPER, [utenlandsoppholdperiodersporsmal, utenlandsoppholdSoektSporsmal]);
    })();

    const ferieOgPermisjonssvar = [harHattFerie, harHattPermisjon].map((_felt) => {
        if (skjemasoknad[_felt]) {
            const skjemafelt = _felt === harHattFerie ? 'ferie' : 'permisjon';
            const periodesporsmal = new Sporsmal(null, skjemasoknad[skjemafelt].map(tilPeriode));
            return new Svar(getNokkelOgVerdier(nokler[_felt]), CHECKBOX, [periodesporsmal]);
        }
        return null;
    });

    const alleSvar = [...ferieOgPermisjonssvar, utenlandsopphold].filter((s) => {
        return s !== null;
    });
    const undersporsmal = new Sporsmal(getSporsmalsledetekst(jegHar, sykepengesoknad, skjemasoknad), alleSvar);

    return new Sporsmal(
        getSporsmalsledetekst(felt, sykepengesoknad, skjemasoknad),
        getJaEllerNeiSvar(Object.byString(skjemasoknad, felt), [undersporsmal]),
        sporsmalstyper[felt],
    );
};

const tilAktiviteterSpm = (skjemasoknad, sykepengesoknad, felt) => {
    return skjemasoknad.aktiviteter.map((aktivitet) => {
        const harAvvik = aktivitet.jobbetMerEnnPlanlagt;
        let undersporsmal = [];

        if (harAvvik) {
            const valgtEnhet = aktivitet.avvik.enhet;
            const prosent = 'prosent';
            const normalArbeidstimePerUkeVerdier = {
                '%ANTALL%': aktivitet.avvik.arbeidstimerNormalUke,
            };
            const arbeidsgradverdier = {
                '%ANTALL%': valgtEnhet === prosent ? aktivitet.avvik.arbeidsgrad : aktivitet.avvik.timer,
            };
            const svarnokkel = valgtEnhet === prosent ? nokler.angiArbeidsgrad : nokler.angiArbeidstimer;
            const faktiskjobbingSvar = new Svar(getNokkelOgVerdier(svarnokkel, arbeidsgradverdier));

            if (valgtEnhet !== prosent) {
                faktiskjobbingSvar.tilleggstekst = new Tilleggstekst(getNokkelOgVerdier(nokler.detteTilsvarer, {
                    '%STILLINGSPROSENT%': aktivitet.avvik.beregnetArbeidsgrad,
                }), HTML);
            }

            undersporsmal = [
                new Sporsmal(
                    getSporsmalsledetekst(normalArbeidstimerPerUke),
                    [new Svar(getNokkelOgVerdier(nokler.normalArbeidstimerPerUkeSvar,
                        normalArbeidstimePerUkeVerdier))]),
                new Sporsmal(getTotalJobbingSporsmal(sykepengesoknad.arbeidsgiver.navn, getNokkelOgVerdier), [faktiskjobbingSvar]),
            ];
        }

        return new Sporsmal(
            getAktivitetssporsmal(aktivitet, sykepengesoknad.arbeidsgiver.navn, getNokkelOgVerdier),
            getJaEllerNeiSvar(harAvvik, undersporsmal),
            sporsmalstyper[felt],
        );
    });
};

const tilAndreInntektskilder = (skjemasoknad, sykepengesoknad, felt) => {
    const svar = skjemasoknad.andreInntektskilder.map((inntektskilde) => {
        if (inntektskilde.avkrysset) {
            const label = getInntektskildeLabel(inntektskilde.annenInntektskildeType, getNokkelOgVerdier);
            if (inntektskilde.annenInntektskildeType !== ANNET) {
                const undersporsmal = new Sporsmal(getNokkelOgVerdier(nokler.erDuSykmeldtFraInntektskilde), getJaEllerNeiSvar(inntektskilde.sykmeldt));
                return new Svar(label, CHECKBOX, [undersporsmal]);
            }
            return new Svar(label, CHECKBOX);
        }
        return null;
    }).filter((i) => {
        return i !== null;
    });
    const undersporsmal = [new Sporsmal(getSporsmalsledetekst(andreInntektskilder), svar)];
    return new Sporsmal(
        getSporsmalsledetekst(felt, sykepengesoknad, skjemasoknad),
        getJaEllerNeiSvar(Object.byString(skjemasoknad, felt), undersporsmal),
        sporsmalstyper[felt],
    );
};

export default (skjemasoknad, sykepengesoknad) => {
    const returverdi = hovedsporsmalsliste.map((felt) => {
        if (skjemasoknad[felt]) {
            switch (felt) {
                case bruktEgenmeldingsdagerFoerLegemeldtFravaer: {
                    return tilEgenmeldingFoerLegemeldt(skjemasoknad, sykepengesoknad, felt);
                }
                case harGjenopptattArbeidFulltUt: {
                    return tilGjenopptattArbeidFulltUt(skjemasoknad, sykepengesoknad, felt);
                }
                case harHattFeriePermisjonEllerUtenlandsopphold: {
                    return tilFeriePermisjonOgUtenlandsopphold(skjemasoknad, sykepengesoknad, felt);
                }
                case aktiviteter: {
                    return tilAktiviteterSpm(skjemasoknad, sykepengesoknad, felt);
                }
                case harAndreInntektskilder: {
                    return tilAndreInntektskilder(skjemasoknad, sykepengesoknad, felt);
                }
                case ansvarBekreftet: {
                    const svar = new Svar(getNokkelOgVerdier(nokler[ansvarBekreftet]), CHECKBOX);
                    return new Sporsmal(null, [svar], sporsmalstyper[felt]);
                }
                default: {
                    break;
                }
            }
        }

        if (felt === underUtdanningISykmeldingsperioden && skjemasoknad.utdanning && skjemasoknad.utdanning.underUtdanningISykmeldingsperioden) {
            const svar1 = new Svar(getNokkelOgVerdier(nokler.dato, {
                '%DATO%': skjemasoknad.utdanning.utdanningStartdato,
            }));
            const startdatoSporsmal = new Sporsmal(getSporsmalsledetekst(utdanningStartdato), [svar1]);
            const fulltidsstudiumSporsmal = new Sporsmal(getSporsmalsledetekst(erUtdanningFulltidsstudium), getJaEllerNeiSvar(skjemasoknad.utdanning.erUtdanningFulltidsstudium));

            return new Sporsmal(
                getSporsmalsledetekst(felt, sykepengesoknad, skjemasoknad),
                getJaEllerNeiSvar(Object.byString(skjemasoknad, felt), [startdatoSporsmal, fulltidsstudiumSporsmal]),
                sporsmalstyper[felt],
            );
        }

        if (felt === arbeidsgiverForskutterer) {
            if (!skjemasoknad.arbeidsgiverForskutterer) {
                return null;
            }
            const nokkel = nokler[`arbeidsgiverForskuttererSvar${skjemasoknad.arbeidsgiverForskutterer}`];
            const svar = new Svar(getNokkelOgVerdier(nokkel), RADIOKNAPPER);

            return new Sporsmal(getSporsmalsledetekst(arbeidsgiverForskutterer), [svar], sporsmalstyper[felt]);
        }

        return new Sporsmal(getSporsmalsledetekst(felt, sykepengesoknad, skjemasoknad), getJaEllerNeiSvar(Object.byString(skjemasoknad, felt)), sporsmalstyper[felt]);
    });

    /* Arbeidsspørsmålet er et array av Sporsmal, mens de andre spørsmålene er Sporsmal-instanser.
    Vi må derfor pakke arbeidsspørsmålet ut slik at det ligger på samme nivå som de andre spørsmålene */

    const indeksForArbeidssporsmal = 3;
    const soknad = [...returverdi.slice(0, indeksForArbeidssporsmal),
        ...returverdi[indeksForArbeidssporsmal],
        ...returverdi.slice(indeksForArbeidssporsmal + 1, returverdi.length)]
        .filter((s) => {
            return s !== null;
        });

    return {
        soknad,
        vaerKlarOverAt: new Tilleggstekst(getNokkelOgVerdier(nokler[ansvarserklaring]), HTML),
        bekreftetKorrektInformasjon: new Sporsmal(null, [new Svar(getNokkelOgVerdier(nokler[bekreftetKorrektInformasjon]), CHECKBOX)]),
    };
};
