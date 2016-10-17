import { expect } from 'chai';
import { visFeilmelding, getFeilmelding } from '../../js/utils/valideringUtils';

describe("visFeilmelding", () => {

    it("Skal returnere false dersom skjemaData = undefined", () => {
        const res = visFeilmelding(undefined, "erOpplysningeneRiktige");
        expect(res).to.be.false;
    });

    it("Skal returnere false dersom skjemaData.fields = undefined", () => {
        const res = visFeilmelding({}, "erOpplysningeneRiktige");
        expect(res).to.be.false;
    });

    it("Skal returnere false dersom skjemaData.fields.field = undefined", () => {
        const res = visFeilmelding({
            fields: {
                test: {}
            }
        }, "erOpplysningeneRiktige");
        expect(res).to.be.false;
    });

    it("Skal returnere false dersom skjemaData.syncErrors = undefined", () => {
        const res = visFeilmelding({
            fields: {
                erOpplysningeneRiktige: {}
            }
        }, "erOpplysningeneRiktige");
        expect(res).to.be.false;
    });

    it("Skal returnere false dersom skjemaData.syncErrors.field = undefined", () => {
        const res = visFeilmelding({
            fields: {
                erOpplysningeneRiktige: {}
            },
            syncErrors: {
                test: ""
            }
        }, "erOpplysningeneRiktige");
        expect(res).to.be.false;
    });

    it("Skal returnere true dersom skjemaData.fields.felt.touched = true og skjemaData.syncErrors.felt = '(streng)'", () => {
        const skjemaData = {
            fields: {
                erOpplysningeneRiktige: {
                    touched: true
                }
            },
            syncErrors: {
                erOpplysningeneRiktige: "Vennligst svar!"
            }
        }
        const res = visFeilmelding(skjemaData, "erOpplysningeneRiktige");
        expect(res).to.be.true;
    });
    
    it("Skal returnere true dersom en av subfeltene har touched = true og skjemaData.syncErrors.felt = '(streng)'", () => {
        const skjemaData = {
            fields: {
                "opplysningeneErRiktige": {
                    "visited": true,
                    "touched": true
                },
                "valgtArbeidssituasjon": {
                    "touched": true
                },
                "feilaktigeOpplysninger": {
                    "periode": {
                        "touched": true
                    },
                    "sykmeldingsgrad": {
                        "touched": true
                    },
                    "arbeidsgiver": {
                        "touched": true
                    },
                    "diagnose": {
                        "touched": true
                    },
                    "andre": {
                        "touched": true
                    }
                }
            },
            syncErrors: {
                feilaktigeOpplysninger: "Vennligst svar!"
            }
        }
        const res = visFeilmelding(skjemaData, "feilaktigeOpplysninger")
        expect(res).to.be.true;
    });

    it("Skal håndtere arrays", () => {
        const skjemaData = {
            fields: {
                tidspunkter: [{
                    dato: {
                        touched: true,
                    },
                    klokkeslett: {
                        touched: true,
                    }
                }, {
                    dato: {
                        touched: true,
                    },
                    klokkeslett: {
                        touched: true,
                    }
                }]
            },
            syncErrors: {
                tidspunkter: [{
                    dato: "Vennligst angi dato",
                    klokkeslett: "Vennligst angi klokkeslett"
                }, {
                    dato: "Vennligst angi dato",
                    klokkeslett: "Vennligst angi klokkeslett"
                }]
            }
        };
        const res1 = visFeilmelding(skjemaData, "tidspunkter[0].klokkeslett");
        const res2 = visFeilmelding(skjemaData, "tidspunkter[1].klokkeslett");
        expect(res1).to.be.true;
        expect(res2).to.be.true;
    });
});

describe("getFeilmelding", () => {
    it("Skal håndtere arrays", () => {
        const skjemaData = {
            fields: {
                tidspunkter: [{
                    dato: {
                        touched: true,
                    },
                    klokkeslett: {
                        touched: true,
                    }
                }, {
                    dato: {
                        touched: true,
                    },
                    klokkeslett: {
                        touched: true,
                    }
                }]
            },
            syncErrors: {
                tidspunkter: [{
                    dato: "Vennligst angi dato",
                    klokkeslett: "Vennligst angi klokkeslett"
                }, {
                    dato: "Vennligst angi dato",
                    klokkeslett: "Vennligst oppgi riktig klokkeslett"
                }]
            }
        };
        const res1 = getFeilmelding(skjemaData, "tidspunkter[0].klokkeslett");
        const res2 = getFeilmelding(skjemaData, "tidspunkter[1].klokkeslett");
        expect(res1).to.equal("Vennligst angi klokkeslett");
        expect(res2).to.equal("Vennligst oppgi riktig klokkeslett")
    });
})