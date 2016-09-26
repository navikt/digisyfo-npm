import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../ledetekster_mock.js";
import getSykmelding from "../../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import FlereOpplysninger from "../../../js/components/sykmeldingOpplysninger/FlereOpplysninger.js";
import Friskmelding from "../../../js/components/sykmeldingOpplysninger/Friskmelding.js";
import UtdypendeOpplysninger from "../../../js/components/sykmeldingOpplysninger/UtdypendeOpplysninger.js";
import BedreArbeidsevne from "../../../js/components/sykmeldingOpplysninger/BedreArbeidsevne.js";
import MeldingTilNAV from "../../../js/components/sykmeldingOpplysninger/MeldingTilNAV.js";
import MeldingTilArbeidsgiver from "../../../js/components/sykmeldingOpplysninger/MeldingTilArbeidsgiver.js";
import Tilbakedatering from "../../../js/components/sykmeldingOpplysninger/Tilbakedatering.js";
import AndreSykmeldingOpplysninger from '../../../js/components/sykmeldingOpplysninger/AndreSykmeldingOpplysninger.js'
import MulighetForArbeid from '../../../js/components/sykmeldingOpplysninger/MulighetForArbeid.js';

let component;

describe("FlereOpplysninger", () => {

    beforeEach(() => {
        component = mount(<FlereOpplysninger sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    });

    describe("Når startet det legemeldte fraværet?", () => {

        it("Skal ikke vise dersom sykmelding.startLegemeldtFravaer === null", () => {
            component = mount(<FlereOpplysninger sykmelding={getSykmelding({
                startLegemeldtFravaer: null
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-startLegemeldtFravaer").length).to.equal(0); 
        });

        it("Skal vise dersom sykmelding.startLegemeldtFravaer er en dato", () => {
            component = mount(<FlereOpplysninger sykmelding={getSykmelding({
                startLegemeldtFravaer: { year: 2016, monthValue: 4, dayOfMonth: 28 }
            })} ledetekster={ledetekster}/>)
            expect(component.find(".js-startLegemeldtFravaer").length).to.equal(1); 
            expect(component.find(".js-startLegemeldtFravaer").text()).to.equal("28.04.2016");
        });

    });

    it("Viser dato sykmelding ble skrevet", () => {
        expect(component.find(".js-utstedelsesdato")).to.have.length(1);
    });

    it("Viser MulighetForArbeid", () => {
        expect(component.find(MulighetForArbeid)).to.have.length(1);
    });

    it("Viser Friskmelding", () => {
        expect(component.find(Friskmelding)).to.have.length(1);
    });

    it("Viser UtdypendeOpplysninger", () => {
        expect(component.find(UtdypendeOpplysninger)).to.have.length(1);
    });

    it("Viser BedreArbeidsevne", () => {
        expect(component.find(BedreArbeidsevne)).to.have.length(1);
    });

    it("Viser MeldingTilNAV", () => {
        expect(component.find(MeldingTilNAV)).to.have.length(1);
    });

    it("Viser MeldingTilArbeidsgiver", () => {
        expect(component.find(MeldingTilArbeidsgiver)).to.have.length(1);
    });                        

    it("Viser Tilbakedatering", () => {
        expect(component.find(Tilbakedatering)).to.have.length(1);
    });

    it("Viser AndreSykmeldingOpplysninger", () => {
        expect(component.find(AndreSykmeldingOpplysninger)).to.have.length(1);
    });

});
