import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import deepFreeze from 'deep-freeze';

import { getParsetSoknad } from '../mock/mockSoknader';
import mapBackendsoknadToSkjemasoknad from '../../js/mappers/mapBackendsoknadToSkjemasoknad';
import * as inntektskildetyper_ from '../../js/enums/inntektskildetyper';

const inntektskildetyper = Object.keys(inntektskildetyper_).map((key) => {
    return {
        annenInntektskildeType: inntektskildetyper_[key],
    };
});

describe("mapBackendsoknadToSkjemasoknad", () => {

    it("Setter alltid bekreftetKorrektInformasjon til false", () => {
        const soknad = getParsetSoknad({
            bekreftetKorrektInformasjon: true,
        });
        const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
        expect(s.bekreftetKorrektInformasjon).to.be.false;
    });

    describe("Permisjon", () => {
        it("mapper permisjon", () => {
            const soknad = getParsetSoknad({
                ferie: [],
                utenlandsopphold: null,
                permisjon: [{
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                }, {
                    fom: new Date("2016-07-22"),
                    tom: new Date("2016-07-28")
                }]
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.permisjon).to.deep.equal([{
                fom: "15.07.2016",
                tom: "20.07.2016"
            }, {
                fom: "22.07.2016",
                tom: "28.07.2016"
            }]);
            expect(s.harHattPermisjon).to.be.true;
            expect(s.harHattFeriePermisjonEllerUtenlandsopphold).to.be.true;
        });

        it("mapper permisjon når det er []", () => {
            const soknad = getParsetSoknad({
                permisjon: [],
                ferie: [],
                utenlandsopphold: null,
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.permisjon).to.deep.equal([]);
            expect(s.harHattPermisjon).to.be.false;
            expect(s.harHattFeriePermisjonEllerUtenlandsopphold).to.be.false;
        });
    }); 

    describe("Ferie", () => {

        it("mapper ferie", () => {
            const soknad = getParsetSoknad({
                ferie: [{
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                }, {
                    fom: new Date("2016-07-22"),
                    tom: new Date("2016-07-28")
                }],
                permisjon: [],
                utenlandsopphold: null,
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.ferie).to.deep.equal([{
                fom: "15.07.2016",
                tom: "20.07.2016"
            }, {
                fom: "22.07.2016",
                tom: "28.07.2016"
            }]);
            expect(s.harHattFerie).to.be.true;
            expect(s.harHattFeriePermisjonEllerUtenlandsopphold).to.be.true;
        });

        it("mapper ferie når det er []", () => {
            const soknad = getParsetSoknad({
                ferie: [],
                utenlandsopphold: null,
                permisjon: [],
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.ferie).to.deep.equal([]);
            expect(s.harHattFerie).to.be.false;
            expect(s.harHattFeriePermisjonEllerUtenlandsopphold).to.be.false;
        });

    })

    describe("Utenlandsopphold", () => {

        it("mapper utenlandsopphold", () => {
            const soknad = getParsetSoknad({
                ferie: [],
                permisjon: [],
                utenlandsopphold: {
                    perioder: [{
                        fom: new Date("2016-07-15"),
                        tom: new Date("2016-07-20")
                    }, {
                        fom: new Date("2016-07-22"),
                        tom: new Date("2016-07-28")
                    }],
                    soektOmSykepengerIPerioden: true,
                },
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.utenlandsopphold).to.deep.equal({
                perioder: [{
                    fom: "15.07.2016",
                    tom: "20.07.2016"
                }, {
                    fom: "22.07.2016",
                    tom: "28.07.2016"
                }],
                soektOmSykepengerIPerioden: true,
            });
            expect(s.harHattUtenlandsopphold).to.be.true;
            expect(s.harHattFeriePermisjonEllerUtenlandsopphold).to.be.true;
        });

        it("mapper utenlandsopphold når det er null", () => {
            const soknad = getParsetSoknad({
                utenlandsopphold: null,
                ferie: [],
                permisjon: [],
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.utenlandsopphold).to.deep.equal({
                perioder: []
            });
            expect(s.harHattUtenlandsopphold).to.be.false;
            expect(s.harHattFeriePermisjonEllerUtenlandsopphold).to.be.false;
        });

    });

    describe("Inntektskilder", () => {
        it("mapper andreInntektskilder", () => {
            const soknad = getParsetSoknad({
                andreInntektskilder: [{
                    sykmeldt: true,
                    annenInntektskildeType: "ANDRE_ARBEIDSFORHOLD"
                }, {
                    sykmeldt: false,
                    annenInntektskildeType: "JORDBRUKER_FISKER_REINDRIFTSUTOEVER"
                }]
            });
            const forventetInntektskilder = [...inntektskildetyper];
            forventetInntektskilder[0] = {
                annenInntektskildeType: "ANDRE_ARBEIDSFORHOLD",
                sykmeldt: true,
                avkrysset: true,
            };
            forventetInntektskilder[3] = {
                annenInntektskildeType: "JORDBRUKER_FISKER_REINDRIFTSUTOEVER",
                sykmeldt: false,
                avkrysset: true,
            };
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.andreInntektskilder).to.deep.equal(forventetInntektskilder);
            expect(s.harAndreInntektskilder).to.be.true;
        });

        it("mapper andreInntektskilder når det er []", () => {
            const soknad = getParsetSoknad({
                andreInntektskilder: []
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.harAndreInntektskilder).to.be.false;
        });
    })

    describe("gjenopptattArbeidFulltUtDato", () => {

        it("mapper gjenopptattArbeidFulltUtDato når datoen er fylt ut", () => {
            const soknad = getParsetSoknad({
                gjenopptattArbeidFulltUtDato: new Date("2017-09-21"),
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.gjenopptattArbeidFulltUtDato).to.equal("21.09.2017");
            expect(s.harGjenopptattArbeidFulltUt).to.equal(true);
        });

        it("mapper gjenopptattArbeidFulltUtDato når datoen ikke er fylt ut", () => {
            const soknad = getParsetSoknad({
                gjenopptattArbeidFulltUtDato: null,
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.gjenopptattArbeidFulltUtDato).to.equal(null);
            expect(s.harGjenopptattArbeidFulltUt).to.equal(false);
        });

    });

    describe("egenmeldingsperioder", () => {

        it("mapper egenmeldingsperioder", () => {
            const soknad = getParsetSoknad({
                egenmeldingsperioder: [{
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                }, {
                    fom: new Date("2016-07-22"),
                    tom: new Date("2016-07-28")
                }]
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.egenmeldingsperioder).to.deep.equal([{
                fom: "15.07.2016",
                tom: "20.07.2016"
            }, {
                fom: "22.07.2016",
                tom: "28.07.2016"
            }]);
            expect(s.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.be.true;
        });

        it("mapper egenmeldingsperioder når det er []", () => {
            const soknad = getParsetSoknad({
                egenmeldingsperioder: []
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.egenmeldingsperioder).to.deep.equal([]);
            expect(s.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.be.false;
        });

    });

    describe("Utdanning", () => {

        it("mapper utdanning", () => {
            const soknad = getParsetSoknad({
                utdanning: {
                    utdanningStartdato: new Date("2016-07-01"),
                    erUtdanningFulltidsstudium: false
                }
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.utdanning).to.deep.equal({
                utdanningStartdato: "01.07.2016",
                erUtdanningFulltidsstudium: false,
                underUtdanningISykmeldingsperioden: true,
            });
        });

        it("mapper utdanning når det er tomt", () => {
            const soknad = getParsetSoknad({
                utdanning: null
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.utdanning).to.deep.equal({
                underUtdanningISykmeldingsperioden: false,
            });
        });

    });

    describe("Aktiviteter", () => {

        it("Mapper aktiviteter uten avvik", () => {
            const soknad = getParsetSoknad({
                fom: new Date("2016-17-15"),
                tom: new Date("2016-07-20"),
                aktiviteter: [{
                    periode: {
                        fom: new Date("2016-07-15"),
                        tom: new Date("2016-07-20")
                    },
                    grad: 60,
                    avvik: null,
                }]
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                },
                grad: 60,
                avvik: {},
                jobbetMerEnnPlanlagt: false,
            }]);
        });

        it("Mapper aktiviteter med avvik der enhet er timer", () => {
            const soknad = getParsetSoknad({
                fom: new Date("2016-17-15"),
                tom: new Date("2016-07-20"),
                aktiviteter: [{
                    periode: {
                        fom: new Date("2016-07-15"),
                        tom: new Date("2016-07-20")
                    },
                    grad: 60,
                    avvik: {
                        arbeidstimerNormalUke: 37.5,
                        timer: 27.5,
                        beregnetArbeidsgrad: 20,
                    },
                    jobbetMerEnnPlanlagt: true,
                }]
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                },
                grad: 60,
                avvik: {
                    arbeidstimerNormalUke: "37,5",
                    enhet: "timer",
                    timer: "27,5",
                    arbeidsgrad: '',
                    beregnetArbeidsgrad: 20,
                },
                jobbetMerEnnPlanlagt: true,
            }]);
        });

        it("Mapper aktiviteter med avvik der enhet er prosent", () => {
            const soknad = getParsetSoknad({
                fom: new Date("2016-17-15"),
                tom: new Date("2016-07-20"),
                aktiviteter: [{
                    periode: {
                        fom: new Date("2016-07-15"),
                        tom: new Date("2016-07-20")
                    },
                    grad: 60,
                    avvik: {
                        arbeidstimerNormalUke: 37.5,
                        arbeidsgrad: 27.5
                    },
                    jobbetMerEnnPlanlagt: true,
                }]
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                },
                grad: 60,
                avvik: {
                    arbeidstimerNormalUke: "37,5",
                    enhet: "prosent",
                    arbeidsgrad: "27,5",
                    timer: ''
                },
                jobbetMerEnnPlanlagt: true,
            }]);
        });

        it("Mapper aktiviteter med avvik der enhet er timer og prosent også er oppgitt (som følge av automatisk utregning)", () => {
            const soknad = getParsetSoknad({
                fom: new Date("2016-17-15"),
                tom: new Date("2016-07-20"),
                aktiviteter: [{
                    periode: {
                        fom: new Date("2016-07-15"),
                        tom: new Date("2016-07-20")
                    },
                    grad: 60,
                    avvik: {
                        arbeidstimerNormalUke: 37.5,
                        timer: 27.5,
                        arbeidsgrad: 15
                    },
                    jobbetMerEnnPlanlagt: true,
                }]
            });
            const s = mapBackendsoknadToSkjemasoknad(deepFreeze(soknad));
            expect(s.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date("2016-07-15"),
                    tom: new Date("2016-07-20")
                },
                grad: 60,
                avvik: {
                    arbeidstimerNormalUke: "37,5",
                    enhet: "timer",
                    timer: "27,5",
                    arbeidsgrad: "15",
                },
                jobbetMerEnnPlanlagt: true,
            }]);
        });

    });

});