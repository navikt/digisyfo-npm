import { bilder } from '../tidslinjeData';
import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    hentet: false,
    ikkeTilgang: false,
    data: [],
};

export const settHendelseIder = (_tidslinjer) => {
    return _tidslinjer.map((tidslinje, tidslinjeIndex) => {
        const hendelser = tidslinje.hendelser.map((hendelse, hendelseIndex) => {
            const hendelseId = hendelse.id ? hendelse.id : hendelseIndex;
            return Object.assign({}, hendelse, {
                id: `${tidslinjeIndex}${hendelseId}`,
            });
        });
        return Object.assign({}, tidslinje, {
            hendelser,
        });
    });
};

export const sorterHendelser = (_hendelser) => {
    const hendelser = [..._hendelser];
    return hendelser.sort((a, b) => {
        if (a.antallDager === b.antallDager) {
            return a.id > b.id ? 1 : -1;
        }
        return a.antallDager > b.antallDager ? 1 : -1;
    });
};

export const leggTilBilder = (_tidslinjer) => {
    return _tidslinjer.map((tidslinje) => {
        const hendelser = tidslinje.hendelser.map((hendelse) => {
            if (bilder[hendelse.tekstkey]) {
                return Object.assign({}, hendelse, {
                    bilde: `${window.APP_SETTINGS.APP_ROOT}${bilder[hendelse.tekstkey]}`,
                });
            }
            return hendelse;
        });
        return Object.assign({}, tidslinje, { hendelser });
    });
};

export const leggTilTidshendelser = (_tidslinjer, arbeidssituasjon) => {
    let uker = [4, 7, 8, 26, 39];
    if (arbeidssituasjon === 'UTEN_ARBEIDSGIVER') {
        uker = [8, 12, 39];
    }
    const tidshendelser = uker.map((uke) => {
        return {
            antallDager: (uke * 7),
            type: 'TID',
            tekstkey: `tidslinje.antall-uker.${uke}`,
        };
    });
    return _tidslinjer.map((tidslinje) => {
        let hendelser = tidslinje.hendelser.concat(tidshendelser);
        hendelser = sorterHendelser(hendelser);
        if (tidslinje.startdato) {
            hendelser[0].type = 'FØRSTE_SYKMELDINGSDAG';
            hendelser[0].tekstkey = 'tidslinje.forste-sykmeldingsdag';
            hendelser[0].data = {
                startdato: tidslinje.startdato,
            };
        } else {
            hendelser[0] = Object.assign({}, hendelser[0], {
                tekstkey: 'tidslinje.sykefravaeret-starter',
                type: 'TITTEL',
            });
        }
        return Object.assign({}, tidslinje, { hendelser });
    });
};

export default function tidslinjer(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.HENT_TIDSLINJER_FEILET: {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: true,
            });
        }
        case actiontyper.HENTER_TIDSLINJER: {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.SET_TIDSLINJER: {
            const data = leggTilBilder(settHendelseIder(leggTilTidshendelser(action.tidslinjer, action.arbeidssituasjon)));
            return {
                henter: false,
                hentingFeilet: false,
                data,
                hentet: true,
            };
        }
        case actiontyper.HENT_TIDSLINJER_IKKE_TILGANG: {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: false,
                ikkeTilgang: true,
                hentet: true,
            });
        }
        case actiontyper.APNE_HENDELSER: {
            if (!state.data.length) {
                return state;
            }
            const data = state.data.map((tidslinje) => {
                return Object.assign({}, tidslinje, {
                    hendelser: tidslinje.hendelser.map((hendelse) => {
                        let obj = hendelse;
                        if (action.hendelseIder.indexOf(hendelse.id) !== -1) {
                            obj = Object.assign({}, hendelse, {
                                erApen: true,
                                visBudskap: true,
                                hoyde: 'auto',
                            });
                        }
                        return obj;
                    }),
                });
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.SET_HENDELSEDATA: {
            if (!state.data.length) {
                return state;
            }
            const data = state.data.map((tidslinje) => {
                return Object.assign({}, tidslinje, {
                    hendelser: tidslinje.hendelser.map((hendelse) => {
                        let obj = hendelse;
                        if (action.hendelseId === hendelse.id) {
                            obj = Object.assign({}, hendelse, action.data);
                        }
                        return obj;
                    }),
                });
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.BRUKER_ER_UTLOGGET: {
            return {
                data: [],
                hentingFeilet: false,
                henter: false,
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
}
