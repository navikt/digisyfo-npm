import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import tidslinjer, { settHendelseIder, leggTilTidshendelser, sorterHendelser } from '../../js/reducers/tidslinjer.js';
import * as actions from '../../js/actions/tidslinjer_actions';
import * as hendelserActions from '../../js/actions/hendelser_actions';

describe('tidslinjer', () => {

    beforeEach(() => {
        window.APP_SETTINGS =  {
            APP_ROOT: '/sykefravaer'
        }
    })

    describe("settHendelseIder", () => {
        it("Setter ID", () => {
            const tidslinjer = deepFreeze([{
                hendelser: [{}, {}]
            }, {
                hendelser: [{}, {}, {}]
            }]);
            const res = settHendelseIder(tidslinjer);
            expect(res).to.deep.equal([{
                hendelser: [{id: "00"}, {id: "01"}]
            }, {
                hendelser: [{id: "10"}, {id: "11"}, {id: "12"}]
            }])
        });
    });

    describe("leggTilTidshendelser", () => {
        it("Legger til tidshendelser og standardhendelse om 'sykmeldt - hva nå'", () => {
            const data = deepFreeze([{
                hendelser: [{
                    antallDager: 0
                }, {
                    antallDager: 28
                }, {
                    antallDager: 49
                }]
            }]);
            const res = leggTilTidshendelser(data);
            expect(res).to.deep.equal([{
                hendelser: [{
                    antallDager: 0,
                    type: "TITTEL",
                    "tekstkey": "tidslinje.sykefravaeret-starter"
                }, {
                    tekstkey: 'tidslinje.sykmeldt-hva-naa',
                    type: 'BOBLE',
                    antallDager: 1,
                }, {
                    antallDager: 28,
                }, {
                    antallDager: 28,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.4"
                }, {
                    antallDager: 49
                }, {
                    antallDager: 49,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.7"
                }, {
                    antallDager: 56,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.8"
                }, {
                    antallDager: 182,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.26"
                }, {
                    antallDager: 273,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.39"
                }]
            }])
        });
    });


    it("Håndterer HENT_TIDSLINJER_FEILET", () => {
        const initiellState = deepFreeze({});
        const action = actions.hentTidslinjerFeilet();
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false, 
            hentingFeilet: true,
            hentet: true,
        })
    });

    it("Håndterer HENTER_TIDSLINJER", () => {
        const initiellState = deepFreeze({});
        const action = actions.henterTidslinjer();
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true, 
            hentingFeilet: false,
            hentet: false,
        })
    });

    it("Håndterer HENT_TIDSLINJER_IKKE_TILGANG", () => {
        const initiellState = deepFreeze({});
        const action = {
            type: "HENT_TIDSLINJER_IKKE_TILGANG"
        }
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: false,
            ikkeTilgang: true,
            hentet: true,
        })
    });

    it("Sorterer hendelser", () => {
        const hendelser = deepFreeze([{antallDager: 52}, { antallDager: 0}, {antallDager: 80}]);
        const res = sorterHendelser(hendelser);
        expect(res).to.deep.equal([{antallDager: 0}, { antallDager: 52}, {antallDager: 80}])
    });

    it("Håndterer SET_TIDSLINJER når sykeforløpet har en startdato", () => {
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer([{
            "startdato": {
                "year": 2016,
                "month": "JUNE",
                "dayOfMonth": 12,
                "dayOfWeek": "SUNDAY",
                "dayOfYear": 164,
                "leapYear": true,
                "monthValue": 6,
                "era": "CE",
                "chronology": {
                    "id": "ISO",
                    "calendarType": "iso8601"
                }
            },
            "hendelser": [{
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 0,
                "tekstkey": "tidslinje.sykefravaeret-starter"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 27,
                "tekstkey": "tidslinje.snakk-med-arbeidsgiver.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 48,
                "tekstkey": "tidslinje.dialogmote-arbeidsgiver.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 55,
                "tekstkey": "tidslinje.aktivitetskrav.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 181,
                "tekstkey": "tidslinje.dialogmote-nav.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 272,
                "tekstkey": "tidslinje.langtidssykmeldt.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 364,
                "tekstkey": "tidslinje.sluttfasen.MED_ARBEIDSGIVER"
            }]
        }])
        const nextState = tidslinjer(initiellState, action);
        expect(nextState.hentet).to.be.true;
        expect(nextState.data).to.deep.equal([{
                "startdato": {
                    "year": 2016,
                    "month": "JUNE",
                    "dayOfMonth": 12,
                    "dayOfWeek": "SUNDAY",
                    "dayOfYear": 164,
                    "leapYear": true,
                    "monthValue": 6,
                    "era": "CE",
                    "chronology": {
                        "id": "ISO",
                        "calendarType": "iso8601"
                    }
                },
                "hendelser": [{
                    "id": "00",
                    "inntruffetdato": null,
                    "type": "FØRSTE_SYKMELDINGSDAG",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.forste-sykmeldingsdag",
                    "data": {
                        startdato: {
                            "year": 2016,
                            "month": "JUNE",
                            "dayOfMonth": 12,
                            "dayOfWeek": "SUNDAY",
                            "dayOfYear": 164,
                            "leapYear": true,
                            "monthValue": 6,
                            "era": "CE",
                            "chronology": {
                                "id": "ISO",
                                "calendarType": "iso8601"
                            }
                        }
                    }
                }, {
                    tekstkey: 'tidslinje.sykmeldt-hva-naa',
                    type: 'BOBLE',
                    id: "01",
                    antallDager: 1,
                }, {
                    "id": "02",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.snakk-med-arbeidsgiver.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen4uker.svg'
                }, {
                    "id": "03",
                    "type": "TID",
                    "antallDager": 28,
                    "tekstkey": "tidslinje.antall-uker.4"
                }, {
                    "id": "04",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.dialogmote-arbeidsgiver.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen7uker.svg'
                }, {
                    "id": "05",
                    "type": "TID",
                    "antallDager": 49,
                    "tekstkey": "tidslinje.antall-uker.7"
                }, {
                    "id": "06",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.aktivitetskrav.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen8uker.svg',
                }, {
                    "id": "07",
                    "type": "TID",
                    "antallDager": 56,
                    "tekstkey": "tidslinje.antall-uker.8"
                }, {
                    "id": "08",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.dialogmote-nav.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen26uker.svg'
                }, {
                    "id": "09",
                    "type": "TID",
                    "antallDager": 182,
                    "tekstkey": "tidslinje.antall-uker.26"
                }, {
                    "id": "010",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.langtidssykmeldt.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen39uker.svg'
                }, {
                    "id": "011",
                    "type": "TID",
                    "antallDager": 273,
                    "tekstkey": "tidslinje.antall-uker.39"
                }, {
                    "id": "012",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.sluttfasen.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/sluttfasen-3.svg'
                }]
            }])
    });

    it("Håndterer SET_TIDSLINJER når sykeforløpet ikke har en startdato", () => {
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer([{
            startdato: null,
            "hendelser": [{
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 0,
                "tekstkey": "tidslinje.med-arbeidsgiver.sykefravaer.startet"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 27,
                "tekstkey": "tidslinje.snakk-med-arbeidsgiver.MED_ARBEIDSGIVER",
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 48,
                "tekstkey": "tidslinje.dialogmote-arbeidsgiver.MED_ARBEIDSGIVER",
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 55,
                "tekstkey": "tidslinje.aktivitetskrav.MED_ARBEIDSGIVER",
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 181,
                "tekstkey": "tidslinje.dialogmote-nav.MED_ARBEIDSGIVER",
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 272,
                "tekstkey": "tidslinje.langtidssykmeldt.MED_ARBEIDSGIVER",
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 364,
                "tekstkey": "tidslinje.sluttfasen.MED_ARBEIDSGIVER",
            }]
        }])
        const nextState = tidslinjer(initiellState, action);
        expect(nextState.hentet).to.be.true;
        expect(nextState.data).to.deep.equal([{
                "startdato": null,
                "hendelser": [{
                    "id": "00",
                    "inntruffetdato": null,
                    "type": "TITTEL",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.sykefravaeret-starter",
                }, {
                    tekstkey: 'tidslinje.sykmeldt-hva-naa',
                    type: 'BOBLE',
                    id: "01",
                    antallDager: 1,
                }, {
                    "id": "02",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.snakk-med-arbeidsgiver.MED_ARBEIDSGIVER",
                    "bilde": "/sykefravaer/img/tidslinje/med-arbeidsgiver/innen4uker.svg"
                }, {
                    "id": "03",
                    "type": "TID",
                    "antallDager": 28,
                    "tekstkey": "tidslinje.antall-uker.4"
                }, {
                    "id": "04",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.dialogmote-arbeidsgiver.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen7uker.svg',
                }, {
                    "id": "05",
                    "type": "TID",
                    "antallDager": 49,
                    "tekstkey": "tidslinje.antall-uker.7"
                }, {
                    "id": "06",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.aktivitetskrav.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen8uker.svg'
                }, {
                    "id": "07",
                    "type": "TID",
                    "antallDager": 56,
                    "tekstkey": "tidslinje.antall-uker.8"
                }, {
                    "id": "08",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.dialogmote-nav.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen26uker.svg',
                }, {
                    "id": "09",
                    "type": "TID",
                    "antallDager": 182,
                    "tekstkey": "tidslinje.antall-uker.26"
                }, {
                    "id": "010",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.langtidssykmeldt.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen39uker.svg',
                }, {
                    "id": "011",
                    "type": "TID",
                    "antallDager": 273,
                    "tekstkey": "tidslinje.antall-uker.39"
                }, {
                    "id": "012",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.sluttfasen.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/sluttfasen-3.svg'
                }]
            }])
    });

    it("Håndterer SET_TIDSLINJER når sykeforløpet har hendelser med ID", () => {
        const initiellState = deepFreeze({});
        const action = actions.setTidslinjer([{
            "startdato": {
                "year": 2016,
                "month": "JUNE",
                "dayOfMonth": 12,
                "dayOfWeek": "SUNDAY",
                "dayOfYear": 164,
                "leapYear": true,
                "monthValue": 6,
                "era": "CE",
                "chronology": {
                    "id": "ISO",
                    "calendarType": "iso8601"
                }
            },
            "hendelser": [{
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 0,
                "tekstkey": "tidslinje.sykefravaeret-starter"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 27,
                "tekstkey": "tidslinje.snakk-med-arbeidsgiver.MED_ARBEIDSGIVER"
            }, {
                "id": "fiskekake",
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 48,
                "tekstkey": "tidslinje.dialogmote-arbeidsgiver.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 55,
                "tekstkey": "tidslinje.aktivitetskrav.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 181,
                "tekstkey": "tidslinje.dialogmote-nav.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 272,
                "tekstkey": "tidslinje.langtidssykmeldt.MED_ARBEIDSGIVER"
            }, {
                "id": null,
                "inntruffetdato": null,
                "type": "BOBLE",
                "antallDager": 364,
                "tekstkey": "tidslinje.sluttfasen.MED_ARBEIDSGIVER"
            }]
        }]);
        const nextState = tidslinjer(initiellState, action);
        expect(nextState.hentet).to.be.true;
        expect(nextState.data).to.deep.equal([{
                "startdato": {
                    "year": 2016,
                    "month": "JUNE",
                    "dayOfMonth": 12,
                    "dayOfWeek": "SUNDAY",
                    "dayOfYear": 164,
                    "leapYear": true,
                    "monthValue": 6,
                    "era": "CE",
                    "chronology": {
                        "id": "ISO",
                        "calendarType": "iso8601"
                    }
                },
                "hendelser": [{
                    "id": "00",
                    "inntruffetdato": null,
                    "type": "FØRSTE_SYKMELDINGSDAG",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.forste-sykmeldingsdag",
                    "data": {
                        startdato: {
                            "year": 2016,
                            "month": "JUNE",
                            "dayOfMonth": 12,
                            "dayOfWeek": "SUNDAY",
                            "dayOfYear": 164,
                            "leapYear": true,
                            "monthValue": 6,
                            "era": "CE",
                            "chronology": {
                                "id": "ISO",
                                "calendarType": "iso8601"
                            }
                        }
                    }
                }, {
                    tekstkey: 'tidslinje.sykmeldt-hva-naa',
                    type: 'BOBLE',
                    id: "01",
                    antallDager: 1,
                }, {
                    "id": "02",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.snakk-med-arbeidsgiver.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen4uker.svg'
                }, {
                    "id": "03",
                    "type": "TID",
                    "antallDager": 28,
                    "tekstkey": "tidslinje.antall-uker.4"
                }, {
                    "id": "0fiskekake",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.dialogmote-arbeidsgiver.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen7uker.svg'
                }, {
                    "id": "05",
                    "type": "TID",
                    "antallDager": 49,
                    "tekstkey": "tidslinje.antall-uker.7"
                }, {
                    "id": "06",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.aktivitetskrav.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen8uker.svg',
                }, {
                    "id": "07",
                    "type": "TID",
                    "antallDager": 56,
                    "tekstkey": "tidslinje.antall-uker.8"
                }, {
                    "id": "08",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.dialogmote-nav.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen26uker.svg'
                }, {
                    "id": "09",
                    "type": "TID",
                    "antallDager": 182,
                    "tekstkey": "tidslinje.antall-uker.26"
                }, {
                    "id": "010",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.langtidssykmeldt.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen39uker.svg'
                }, {
                    "id": "011",
                    "type": "TID",
                    "antallDager": 273,
                    "tekstkey": "tidslinje.antall-uker.39"
                }, {
                    "id": "012",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.sluttfasen.MED_ARBEIDSGIVER",
                    "bilde": '/sykefravaer/img/tidslinje/sluttfasen-3.svg'
                }]
            }])
    });


    it("Håndterer ÅPNE_HENDELSER", () => {
        const initiellState = deepFreeze({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: false
                }, {
                    id: 1,
                    erApen: false
                }, {
                    id: 2,
                    erApen: false
                }, {
                    id: 3,
                    erApen: false
                }, {
                    id: 4,
                    erApen: false
                }]
            }],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
        const action = hendelserActions.apneHendelser([0, 2, 3]);
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true,
                    hoyde: "auto",
                    visBudskap: true
                }, {
                    id: 1,
                    erApen: false,
                }, {
                    id: 2,
                    erApen: true,
                    hoyde: "auto",
                    visBudskap: true
                }, {
                    id: 3,
                    erApen: true,
                    hoyde: "auto",
                    visBudskap: true
                }, {
                    id: 4,
                    erApen: false,
                }]
            }],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    }); 


    it("Håndterer SET_HENDELSEDATA", () => {
        const initiellState = deepFreeze({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true
                }, {
                    id: 1,
                    erApen: true
                }, {
                    id: 2,
                    erApen: false
                }]
            }],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
        const action = hendelserActions.setHendelseData(1, {
            ikon: "helge.jpg",
            hoyde: 55
        });
        const nextState = tidslinjer(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                    hendelser: [{
                    id: 0,
                    erApen: true
                }, {
                    id: 1,
                    erApen: true,
                    ikon: "helge.jpg",
                    hoyde: 55
                }, {
                    id: 2,
                    erApen: false
                }]
            }],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
    });

    it("Håndterer BRUKER_ER_UTLOGGET", () => {
        const initialState = deepFreeze({
            data: [{startdato: "", hendelser: []}],
            henter: false,
            hentingFeilet: false,
            hentet: true,
        });
        const action = {
            type: "BRUKER_ER_UTLOGGET"
        };
        const nextState = tidslinjer(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [],
            hentet: true,
        })
    })


}); 
