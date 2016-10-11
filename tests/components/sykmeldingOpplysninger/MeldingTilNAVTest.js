import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../ledetekster_mock.js";
import getSykmelding from "../../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import MeldingTilNAV from "../../../js/components/sykmeldingOpplysninger/MeldingTilNAV.js";

let component;
describe("Melding til NAV", () => {

    describe("navBoerTaTakISaken", () => {
        it("Skal vise checkbox dersom sykmelding.navBoerTaTakISaken === true", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: true
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå")
        });

        it("Skal ikke vise navBoerTaTakISaken dersom den ikke finnes", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0)
        });
    }); 

    describe("navBoerTaTakISaken med begrunnelse", () => {
        it("Skal vise checkbox og begrunnelse dersom sykmelding.navBoerTaTakISaken === true og navBoerTaTakISakenBegrunnelse = (noe)", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(
                <MeldingTilNAV sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: true,
                    navBoerTaTakISakenBegrunnelse: "Den sykmeldte trenger bistand fra NAV"
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå")
            expect(component.find(".js-navBoerTaTakISakenBegrunnelse").text()).to.equal("Den sykmeldte trenger bistand fra NAV")
        });

        it("Skal ikke vise begrunnelse dersom den ikke finnes", () => {
            const getState = {
                ledetekster: { ledetekster },
            };

            component = mount(
                <MeldingTilNAV sykmelding={getSykmelding({
                meldingTilNav: {
                    navBoerTaTakISaken: true
                }
            })} ledetekster={ledetekster}/>);
            expect(component.find(".js-navBoerTaTakISakenBegrunnelse").length).to.equal(0)
        });
    });


}); 