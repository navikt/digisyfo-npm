import { expect } from 'chai';
import { getTomDato, mapAktiviteter, getGjenopptattArbeidFulltUtDato } from '../../js/utils/sykepengesoknadUtils';
import getSoknad from '../mock/mockSoknader';
import deepFreeze from 'deep-freeze';

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

    describe("mapAktiviteter", () => {

        it("Returnerer bare de periodene som er aktuelle for denne søknaden", () => {
            const soknad = {
                fom: new Date("2016-05-10"),
                tom: new Date("2016-05-20"),
                aktiviteter: [{
                    periode: {
                        fom: new Date("2016-05-01"),
                        tom: new Date("2016-05-09")
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date("2016-05-10"),
                        tom: new Date("2016-05-20")
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date("2016-05-21"),
                        tom: new Date("2016-05-25")
                    },
                    grad: 100,
                    avvik: null,
                }]
            };

            const a = mapAktiviteter(deepFreeze(soknad));
            expect(a.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date("2016-05-10"),
                    tom: new Date("2016-05-20")
                },
                grad: 100,
                avvik: null,
            }])
        })

        it("Deler de andre periodene opp slik at bare den aktuelle delen av perioden tas med", () => {
            const soknad = {
                fom: new Date("2016-05-10"),
                tom: new Date("2016-05-20"),
                aktiviteter: [{
                    periode: {
                        fom: new Date("2016-05-01"),
                        tom: new Date("2016-05-05")
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date("2016-05-06"),
                        tom: new Date("2016-05-12")
                    },
                    grad: 100,
                    avvik: null,
                }, {
                    periode: {
                        fom: new Date("2016-05-13"),
                        tom: new Date("2016-05-25")
                    },
                    grad: 100,
                    avvik: null,
                }]
            };

            const a = mapAktiviteter(deepFreeze(soknad));
            expect(a.aktiviteter).to.deep.equal([{
                periode: {
                    fom: new Date("2016-05-10"),
                    tom: new Date("2016-05-12")
                },
                grad: 100,
                avvik: null,
            }, {
                periode: {
                    fom: new Date("2016-05-13"),
                    tom: new Date("2016-05-20")
                },
                grad: 100,
                avvik: null,
            }])
        });

        it("Testeksempel mapAktiviteter 1", () => {
            const aktiviteter = [
                {
                  "periode": {
                    "fom": new Date("2017-06-22"),
                    "tom": new Date("2017-08-02")
                  },
                  "grad": 100,
                  "avvik": null
                }
              ];
            const fom = new Date("2017-06-22");
            const tom = new Date("2017-07-12");
            const soknad = deepFreeze({ fom, tom, aktiviteter });
            const a = mapAktiviteter(soknad);

            expect(a.aktiviteter).to.deep.equal([{
                "periode": {
                    "fom": new Date("2017-06-22"),
                    "tom": new Date("2017-07-12")
                },
                "grad": 100,
                "avvik": null
            }])
        });

        it("Testeksempel mapAktiviteter 2", () => {
            const aktiviteter = [
              {
                "periode": {
                  "fom": new Date("2016-07-15"),
                  "tom": new Date("2016-07-20")
                },
              },
              {
                "periode": {
                  "fom": new Date("2016-07-21"),
                  "tom": new Date("2016-07-25")
                },
              },
              {
                "periode": {
                  "fom": new Date("2016-07-26"),
                  "tom": new Date("2016-07-30")
                },
              }
            ];
            const fom = new Date("2016-07-18");
            const tom = new Date("2016-07-24");
            const soknad = { aktiviteter, fom, tom };
            const a = mapAktiviteter(deepFreeze(soknad));
            expect(a.aktiviteter).to.deep.equal([
                {
                    periode: {
                        fom: new Date("2016-07-18"),
                        tom: new Date("2016-07-20")
                    },
                },
                {
                    periode: {
                        fom: new Date("2016-07-21"),
                        tom: new Date("2016-07-24")
                    },
                }
            ]);
        });

    });

    describe("getGjenopptattArbeidFulltUtDato", () => {

      let skjemasoknad;

      beforeEach(() => {
        skjemasoknad = {
          harGjenopptattArbeidFulltUt: true,
        }
      });

      it("Skal returnere null hvis harGjenopptattArbeidFulltUt er false og gjenopptattArbeidFulltUtDato er riktig fylt ut", () => {
        skjemasoknad.harGjenopptattArbeidFulltUt = false;
        skjemasoknad.gjenopptattArbeidFulltUtDato = "20.02.2017";
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.be.null;
      })

      it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato ikke er fylt ut", () => {
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.be.null;
      });

      it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er noe ugyldig (1)", () => {
        skjemasoknad.gjenopptattArbeidFulltUtDato = "02.02"
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.be.null;
      });

      it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (1)", () => {
        skjemasoknad.gjenopptattArbeidFulltUtDato = "0_.__.____"
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.be.null;
      });

      it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (2)", () => {
        skjemasoknad.gjenopptattArbeidFulltUtDato = "10.__.____"
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.be.null;
      });

      it("Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (3)", () => {
        skjemasoknad.gjenopptattArbeidFulltUtDato = "10.05.____"
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.be.null;
      });


      it("Skal returnere gjenopptattArbeidFulltUtDato som en dato hvis gjenopptattArbeidFulltUtDato er noe gyldig", () => {
        skjemasoknad.gjenopptattArbeidFulltUtDato = "23.12.2017";
        const dato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
        expect(dato).to.deep.equal(new Date("2017-12-23"));
      });

    }); 

})