import { expect } from 'chai';
import { getLedetekst, getHtmlLedetekst, setLedetekster, erReplacements } from '../../js/ledetekster';

describe("LABELS", function () {

    afterEach(() => {
        window.VIS_LEDETEKSTNOKLER = false;
    });

    describe("getLedetekst", () => {

        it("Skal gi beskjed hvis en sykepengesoknadoppsummeringledetekst ikke finnes", function () {
            const ledetekster = {
                "min.tekst": "Min tekst"
            }
            const label = getLedetekst("denne.finnes.ikke", ledetekster, {
                "%FOM%": "12. februar",
                "%TOM%": "8. mars"
            });
            expect(label).to.equal("denne.finnes.ikke [MANGLER LEDETEKST]");
        });

        it("Skal returnere tom streng dersom ledetekster ikke er hentet", function() {
        	const label = getLedetekst("min.ledetekst", {});
        	expect(label).to.equal("");
        });

        it("Skal erstatte placeholdere", function() {
            const label = getLedetekst("min.ledetekst", {
                "min.ledetekst": "Hei %NAVN%, hvordan går det med %OBJEKT%?"
            }, {
                "%NAVN%": "Ola",
                "%OBJEKT%": "Kari"
            });
            expect(label).to.equal("Hei Ola, hvordan går det med Kari?");
        });

        it("Skal erstatte 0", function() {
            const label = getLedetekst("min.ledetekst", {
                "min.ledetekst": "%GRAD% % sykmeldt"
            }, {
                "%GRAD%": 0
            });
            expect(label).to.equal("0 % sykmeldt");
        });

        it("Skal erstatte selv om keyen har påfølgende .", function() {
            const label = getLedetekst("min.ledetekst", {
                "min.ledetekst": "%GRAD%. % sykmeldt"
            }, {
                "%GRAD%": 0
            });
            expect(label).to.equal("0. % sykmeldt");
        });

        it("viser key dersom window.VIS_LEDETEKSTNOKLER = true", function() {
            window.VIS_LEDETEKSTNOKLER = true;
            const label = getLedetekst("min.ledetekst", {
                "min.ledetekst": "sykmeldt"
            });
            expect(label).to.equal("min.ledetekst");
        });

        it("Skal returnere '' dersom ledetekster ikke er satt", () => {
            const label = getLedetekst("min.ledetekst");
            expect(label).to.equal("");
        });

        it("Skal returnere '' dersom ledetekster er undefined", () => {
            const label = getLedetekst("min.ledetekst", undefined);
            expect(label).to.equal("");
        });

        it("Skal returnere '' dersom ledetekster er undefined og det sendes inn replacements", () => {
            const label = getLedetekst("min.ledetekst", undefined, {
                "%REPLACE%": "Me"
            });
            expect(label).to.equal("");
        });

    });

    describe("getHtmlLedetekst", () => {

        it("Skal returnere { __html: label }", () => {
            const ledetekster = {
                "min.tekst": "<p>Min tekst</p>"
            };
            const tekst = getHtmlLedetekst("min.tekst", ledetekster);
            expect(tekst).to.deep.equal({
                __html: "<p>Min tekst</p>"
            });
        });

        it("Skal returnere { __html: label } når teksten ikke finnes", () => {
            const ledetekster = {
                "min.tekst": "<p>Min tekst</p>"
            };
            const tekst = getHtmlLedetekst("min.undefined.tekst", ledetekster);
            expect(tekst).to.deep.equal({
                __html: "min.undefined.tekst [MANGLER LEDETEKST]"
            });
        });

        describe("Når ledetekster er satt via setLedetekster()", () => {
            beforeEach(() => {
                const ledetekster = {
                    "min.tekst": "<p>Min tekst</p>"
                };
                setLedetekster(ledetekster)
            });

            it("Skal returnere { __html: label}", () => {
                const tekst = getHtmlLedetekst("min.tekst");
                expect(tekst).to.deep.equal({
                    __html: "<p>Min tekst</p>"
                });
            });

        })

    })

    describe("erReplacements", () => {

        it("Returnerer true hvis objekt inneholder 1 replacements", () => {
            const obj = {
                "%ERSTATT%": "geniale"
            }
            expect(erReplacements(obj)).to.be.true;
        });

        it("Returnerer true hvis objekt inneholder 2 replacements", () => {
            const obj = {
                "%ERSTATT%": "geniale",
                "%ERSTATT2%": "geniale"
            }
            expect(erReplacements(obj)).to.be.true;
        });

        it("Returnerer false hvis objekt ikke er replacements", () => {
            const obj = {
                "min.tekst": "Min tekst"
            }
            expect(erReplacements(obj)).to.be.false;
        });

        it("Returnerer false hvis objekt ikke er replacements", () => {
            const obj = {
                "min.tekst.med.%-tegn": "Min tekst"
            }
            expect(erReplacements(obj)).to.be.false;
        });

        it("Returnerer false hvis objekt ikke er replacements, men ligner veldig (1)", () => {
            const obj = {
                "%REPLACE": "Min tekst"
            }
            expect(erReplacements(obj)).to.be.false;
        });


        it("Returnerer false hvis objekt ikke er replacements, men ligner veldig (2)", () => {
            const obj = {
                "%REPLACE": "Min tekst",
                "%REPLACE2%": "Min adnre tekst"
            }
            expect(erReplacements(obj)).to.be.false;
        });

        it("Returnerer false hvis objekt ikke er replacements, men ligner veldig (3)", () => {
            const obj = {
                "%REPLAC%E": "Min tekst",
            }
            expect(erReplacements(obj)).to.be.false;
        });

    })

    describe("etter setLedetekster()", () => {

        let ledetekster;
        let replacements;

        beforeEach(() => {
            ledetekster = {
                'min.tekst': 'Min tekst',
                'min.andre.tekst': 'Min andre %ERSTATT% tekst'
            }
            replacements =  {
                '%ERSTATT%': 'geniale'
            }
            setLedetekster(ledetekster);
        });

        it('Skal hente tekster fra satte tekster', () => {
            expect(getLedetekst('min.tekst')).to.equal('Min tekst');
        });

        it('Skal hente tekster fra innsendte tekster etter at tekster er satt (sikrer bakoverkompabilitet)', () => {
            const ledetekster = {
                "min.tekst": "Min andre tekst"
            }
            expect(getLedetekst('min.tekst', ledetekster)).to.equal('Min andre tekst');
        });

        it('Skal erstatte tekster etter at tekster er satt når ledetekster sendes inn (sikrer bakoverkompabilitet)', () => {
            const ledetekster = {
                "min.tekst": "Min andre %ERSTATT% tekst"
            };
            expect(getLedetekst('min.tekst', ledetekster, replacements)).to.equal('Min andre geniale tekst');
        });

        it("Skal erstatte tekster etter at tekster er satt når ledetekster ikke sendes inn (sikrer bakoverkompabilitet)", () => {
            expect(getLedetekst('min.andre.tekst', replacements)).to.equal('Min andre geniale tekst');
        });

        it("Skal returnere '' dersom ledetekster er undefined", () => {
            const label = getLedetekst("min.tekst", undefined);
            expect(label).to.equal('Min tekst');
        });

        it("Skal returnere Min tekst dersom ledetekster er undefined og det sendes inn replacements", () => {
            const label = getLedetekst("min.tekst", undefined, {
                "%REPLACE%": "Me"
            });
            expect(label).to.equal("Min tekst");
        });

    });

});
