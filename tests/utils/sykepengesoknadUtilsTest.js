import { expect } from 'chai';
import { getTomDato } from '../../js/utils/sykepengesoknadUtils';
import getSoknad from '../mock/mockSoknader';

describe("sykepengesoknadUtils", () => {

    describe("getTomDato", () => {
        it("Returnerer senesteTom  hvis gjenopptattArbeidFulltUtDato ikke er utfylt", () => {
            expect(getTomDato({
                gjenopptattArbeidFulltUtDato: null,
                aktiviteter:  [{
                  "periode": {
                    "fom": new Date("2017-01-01"),
                    "tom": new Date("2017-01-15")
                  },
                  "grad": 100,
                  "avvik": null
                }, {
                  "periode": {
                    "fom": new Date("2017-01-01"),
                    "tom": new Date("2017-01-25")
                  },
                  "grad": 50,
                  "avvik": null
                }]
            })).to.deep.equal(new Date("2017-01-25"));
        });

        it("Returnerer gjenopptattArbeidFulltUtDato minus en dag hvis gjenopptattArbeidFulltUtDato er utfylt", () => {
            expect(getTomDato({
                gjenopptattArbeidFulltUtDato: new Date("2017-01-24"),
                aktiviteter:  [{
                  "periode": {
                    "fom": new Date("2017-01-01"),
                    "tom": new Date("2017-01-15")
                  },
                  "grad": 100,
                  "avvik": null
                }, {
                  "periode": {
                    "fom": new Date("2017-01-01"),
                    "tom": new Date("2017-01-25")
                  },
                  "grad": 50,
                  "avvik": null
                }]
            })).to.deep.equal(new Date("2017-01-23"));
        });

        it("Returnerer gjenopptattArbeidFulltUtDato hvis gjenopptattArbeidFulltUtDato er utfylt og samme dag som tidligste fom", () => {
            expect(getTomDato({
                gjenopptattArbeidFulltUtDato: new Date("2017-01-01"),
                aktiviteter:  [{
                  "periode": {
                    "fom": new Date("2017-01-01"),
                    "tom": new Date("2017-01-15")
                  },
                  "grad": 100,
                  "avvik": null
                }, {
                  "periode": {
                    "fom": new Date("2017-01-16"),
                    "tom": new Date("2017-01-25")
                  },
                  "grad": 50,
                  "avvik": null
                }]
            })).to.deep.equal(new Date("2017-01-01"));
        });

    });

})