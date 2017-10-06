import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mock/mockLedetekster.js";
import { getParsetSykmelding } from "../../mock/mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import AndreSykmeldingOpplysninger from "../../../js/components/sykmeldingOpplysninger/AndreSykmeldingOpplysninger";

describe("AndreSykmeldingOpplysninger", () => {

    let component;

    it("Skal ikke vise sykmelderTlf dersom sykmelderTlf === null", () => {
        const getState = {
            ledetekster: { ledetekster },
        };

        component = mount(<AndreSykmeldingOpplysninger sykmelding={getParsetSykmelding({
            bekreftelse: {
                sykmelderTlf: null
            }
        })} ledetekster={ledetekster}/>)
        expect(component.find(".js-sykmelderTlf").length).to.equal(0);
    });

    it("Skal vise sykmelderTlf dersom sykmelderTlf finnes", () => {
        const getState = {
            ledetekster: { ledetekster },
        };

        component = mount(<AndreSykmeldingOpplysninger sykmelding={getParsetSykmelding({
            bekreftelse: {
                sykmelderTlf: "22332244"
            }
        })} ledetekster={ledetekster}/>)
        expect(component.find(".js-sykmelderTlf").length).to.equal(1);
        expect(component.find(".js-sykmelderTlf").text()).to.equal("22332244");
    });
});