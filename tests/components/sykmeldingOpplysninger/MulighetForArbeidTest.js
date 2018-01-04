import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mock/mockLedetekster.js";
import { getParsetSykmelding } from "../../mock/mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import MulighetForArbeid from "../../../js/components/sykmeldingOpplysninger/MulighetForArbeid.js";

let component;

describe("Mulighet for arbeid", () => {

    let perioder; 

    beforeEach(() => {
        perioder = [{
            fom: new Date("2018-01-01"),
            tom: new Date("2018-02-18"),
        }]
    });

    describe("aktivitetIkkeMulig433", () => {

        it("Skal vise dersom sykmelding.aktivitetIkkeMulig433 === ['Helsetilstanden hindrer pasienten i å være i aktivitet']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig433: ["Helsetilstanden hindrer pasienten i å være i aktivitet"]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig433").text()).to.contain("Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet");
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.contain("Helsetilstanden hindrer pasienten i å være i aktivitet");
        });

        it("Skal vise 'Annet' dersom sykmelding.aktivitetIkkeMulig433 === ['Helsetilstanden hindrer pasienten i å være i aktivitet', 'Annet']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig433: ["Helsetilstanden hindrer pasienten i å være i aktivitet", "Annet"]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.contain("Annet");
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.contain("Helsetilstanden hindrer pasienten i å være i aktivitet");
        });

        it("Skal ikke vise 'Annet' dersom sykmelding.aktivitetIkkeMulig433 === ['Annet']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig433: ["Annet"]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.not.contain("Annet");
        });


        it("Skal vise dersom sykmelding.aktivitetIkkeMulig433 === ['A', 'B', 'C']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig433: ['A', 'B', 'C']
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig433").text()).to.contain("Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet");
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.contain("A");
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.contain("B");
            expect(component.find(".js-aktivitetIkkeMulig433hvisJa").text()).to.contain("C");
        });  

        it("Skal ikke vise dersom sykmelding.aktivitetIkkeMulig433 === null", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig433: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig433").length).to.equal(0);
        });

        it("Skal ikke vise dersom sykmelding.aarsakAktivitetIkkeMulig433 === null", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aarsakAktivitetIkkeMulig433: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(0);
        });

        it("Skal vise årsak med standard-spørsmål hvis sykmelding.aarsakAktivitetIkkeMulig433 er fylt ut og perioden er under 7 uker", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                startLegemeldtFravaer: new Date("2018-01-01"),
                mulighetForArbeid: {
                    aarsakAktivitetIkkeMulig433: "Pasienten har vondt i ryggen",
                    perioder: [{
                        fom: new Date("2018-01-01"),
                        tom: new Date("2018-01-10"),
                    }]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.equal("Pasienten har vondt i ryggen");
            expect(component.text()).to.contain("Beskriv nærmere");
        });

        it("Skal vise årsak med spesialspørsmål hvis sykmelding.aarsakAktivitetIkkeMulig433 er fylt ut og perioden er nøyaktig 7 uker", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                startLegemeldtFravaer: new Date("2018-01-01"),
                mulighetForArbeid: {
                    aarsakAktivitetIkkeMulig433: "Pasienten har vondt i ryggen",
                    perioder: [{
                        fom: new Date("2018-01-01"),
                        tom: new Date("2018-02-18"),
                    }]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.equal("Pasienten har vondt i ryggen");
            expect(component.text()).to.contain("Begrunnelse til NAVs vurdering av aktivitetskravet");
        });

        it("Skal vise årsak med standard-spørsmål hvis sykmelding.aarsakAktivitetIkkeMulig433 er fylt ut, men startLegemeldtFravaer er null", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                startLegemeldtFravaer: null,
                mulighetForArbeid: {
                    aarsakAktivitetIkkeMulig433: "Pasienten har vondt i ryggen",
                    perioder: [{
                        fom: new Date("2018-01-01"),
                        tom: new Date("2018-02-18"),
                    }]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.equal("Pasienten har vondt i ryggen");
            expect(component.text()).to.contain("Beskriv nærmere");
        });


        it("Skal vise årsak med spesialspørsmål hvis sykmelding.aarsakAktivitetIkkeMulig433 er fylt ut og perioden er mellom 7 uker og 17 uker", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                startLegemeldtFravaer: new Date("2018-01-01"),
                mulighetForArbeid: {
                    aarsakAktivitetIkkeMulig433: "Pasienten har vondt i ryggen",
                    perioder: [{
                        fom: new Date("2018-01-01"),
                        tom: new Date("2018-02-25"),
                    }]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.equal("Pasienten har vondt i ryggen");
            expect(component.text()).to.contain("Begrunnelse til NAVs vurdering av aktivitetskravet");
        });

        it("Skal vise årsak med standard-spørsmål hvis sykmelding.aarsakAktivitetIkkeMulig433 er fylt ut og perioden er 17 uker", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                startLegemeldtFravaer: new Date("2018-01-01"),
                mulighetForArbeid: {
                    aarsakAktivitetIkkeMulig433: "Pasienten har vondt i ryggen",
                    perioder: [{
                        fom: new Date("2018-01-01"),
                        tom: new Date("2018-04-29"),
                    }]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.equal("Pasienten har vondt i ryggen");
            expect(component.text()).to.contain("Beskriv nærmere");
        });

        it("Skal vise årsak med standard-spørsmål hvis sykmelding.aarsakAktivitetIkkeMulig433 er fylt ut og perioden er over 17 uker", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                startLegemeldtFravaer: new Date("2018-01-01"),
                mulighetForArbeid: {
                    aarsakAktivitetIkkeMulig433: "Pasienten har vondt i ryggen",
                    perioder: [{
                        fom: new Date("2018-01-01"),
                        tom: new Date("2018-05-08"),
                    }]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig433").text()).to.equal("Pasienten har vondt i ryggen");
            expect(component.text()).to.contain("Beskriv nærmere");
        });

    })

    describe("aktivitetIkkeMulig434", () => {

        it("Skal vise dersom sykmelding.aktivitetIkkeMulig434 === ['Helsetilstanden hindrer pasienten i å være i aktivitet']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig434: ["Helsetilstanden hindrer pasienten i å være i aktivitet"]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig434").text()).to.contain("Det er forhold på arbeidsplassen som hindrer arbeidsrelatert aktivitet");
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.contain("Helsetilstanden hindrer pasienten i å være i aktivitet");
        });

        it("Skal vise dersom sykmelding.aktivitetIkkeMulig434 === ['A', 'B', 'C']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig434: ['A', 'B', 'C']
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig434").text()).to.contain("Det er forhold på arbeidsplassen som hindrer arbeidsrelatert aktivitet");
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.contain("A");
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.contain("B");
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.contain("C");
        });  

        it("Skal ikke vise dersom sykmelding.aktivitetIkkeMulig434 === null", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig434: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig434").length).to.equal(0);
        });

        it("Skal vise dersom sykmelding.aarsakAktivitetIkkeMulig434 === 'Derfor'", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aarsakAktivitetIkkeMulig434: 'Derfor'
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aarsakAktivitetIkkeMulig434").length).to.equal(1);
            expect(component.find(".js-aarsakAktivitetIkkeMulig434").text()).to.equal("Derfor");
        });

        it("Skal vise 'Annet' dersom sykmelding.aktivitetIkkeMulig434 === ['Helsetilstanden hindrer pasienten i å være i aktivitet', 'Annet']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig434: ["Helsetilstanden hindrer pasienten i å være i aktivitet", "Annet"]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.contain("Annet");
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.contain("Helsetilstanden hindrer pasienten i å være i aktivitet");
        });

        it("Skal ikke vise 'Annet' dersom sykmelding.aktivitetIkkeMulig434 === ['Annet']", () => {
            component = mount(<MulighetForArbeid sykmelding={getParsetSykmelding({
                mulighetForArbeid: {
                    perioder,
                    aktivitetIkkeMulig434: ["Annet"]
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-aktivitetIkkeMulig434hvisJa").text()).to.not.contain("Annet");
        });

    }); 

});