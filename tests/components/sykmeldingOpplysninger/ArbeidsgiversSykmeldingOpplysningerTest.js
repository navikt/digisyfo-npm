import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../ledetekster_mock.js";
import getSykmelding from "../../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import FlereOpplysninger from "../../../js/components/sykmeldingOpplysninger/FlereOpplysninger.js";
import ArbeidsgiversNokkelopplysninger from '../../../js/components/sykmeldingOpplysninger/ArbeidsgiversNokkelopplysninger'

import ArbeidsgiversSykmeldingOpplysninger from '../../../js/components/sykmeldingOpplysninger/ArbeidsgiversSykmeldingOpplysninger.js';

let component;


describe("ArbeidsgiversSykmelding", () => {

    beforeEach(() => {
        component = shallow(<ArbeidsgiversSykmeldingOpplysninger sykmelding={getSykmelding()} ledetekster={ledetekster} />)
    });

    it("Skal vise fødselsnummer", () => {
        expect(component.find(".js-fnr").text()).to.equal("***REMOVED***")
    });

    it("Viser Nokkelopplysninger", () => {
        expect(component.find(ArbeidsgiversNokkelopplysninger)).to.have.length(1);
    });

    it("Viser FlereOpplysninger", () => {
        expect(component.find(FlereOpplysninger)).to.have.length(1);
    });
});
