import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import FlereOpplysninger from '../../../js/components/sykmeldingOpplysninger/FlereOpplysninger';
import Friskmelding from '../../../js/components/sykmeldingOpplysninger/Friskmelding';
import UtdypendeOpplysninger from '../../../js/components/sykmeldingOpplysninger/UtdypendeOpplysninger';
import BedreArbeidsevne from '../../../js/components/sykmeldingOpplysninger/BedreArbeidsevne';
import MeldingTilNAV from '../../../js/components/sykmeldingOpplysninger/MeldingTilNAV';
import MeldingTilArbeidsgiver from '../../../js/components/sykmeldingOpplysninger/MeldingTilArbeidsgiver';
import Tilbakedatering from '../../../js/components/sykmeldingOpplysninger/Tilbakedatering';
import AndreSykmeldingOpplysninger from '../../../js/components/sykmeldingOpplysninger/AndreSykmeldingOpplysninger';
import MulighetForArbeid from '../../../js/components/sykmeldingOpplysninger/MulighetForArbeid';

chai.use(chaiEnzyme());
const expect = chai.expect;

let component;

describe('FlereOpplysninger', () => {
    beforeEach(() => {
        component = mount(<FlereOpplysninger
            sykmelding={getParsetSykmelding()}
            ledetekster={ledetekster} />);
    });

    describe('Når startet det legemeldte fraværet?', () => {
        it('Skal ikke vise dersom sykmelding.startLegemeldtFravaer === null', () => {
            component = mount(<FlereOpplysninger
                sykmelding={getParsetSykmelding({
                    startLegemeldtFravaer: null,
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-startLegemeldtFravaer').length).to.equal(0);
        });

        it('Skal vise dersom sykmelding.startLegemeldtFravaer er en dato', () => {
            component = mount(<FlereOpplysninger
                sykmelding={getParsetSykmelding({
                    startLegemeldtFravaer: new Date('2016-04-28'),
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-startLegemeldtFravaer').length).to.equal(1);
            expect(component.find('.js-startLegemeldtFravaer').text()).to.equal('28. april 2016');
        });
    });

    it('Viser dato sykmelding ble skrevet', () => {
        expect(component.find('.js-utstedelsesdato')).to.have.length(1);
    });

    it('Viser MulighetForArbeid', () => {
        expect(component.find(MulighetForArbeid)).to.have.length(1);
    });

    it('Viser Friskmelding', () => {
        expect(component.find(Friskmelding)).to.have.length(1);
    });

    it('Viser UtdypendeOpplysninger', () => {
        expect(component.find(UtdypendeOpplysninger)).to.have.length(1);
    });

    it('Viser BedreArbeidsevne', () => {
        expect(component.find(BedreArbeidsevne)).to.have.length(1);
    });

    it('Viser MeldingTilNAV', () => {
        expect(component.find(MeldingTilNAV)).to.have.length(1);
    });

    it('Viser MeldingTilArbeidsgiver', () => {
        expect(component.find(MeldingTilArbeidsgiver)).to.have.length(1);
    });

    it('Viser Tilbakedatering', () => {
        expect(component.find(Tilbakedatering)).to.have.length(1);
    });

    it('Viser AndreSykmeldingOpplysninger', () => {
        expect(component.find(AndreSykmeldingOpplysninger)).to.have.length(1);
    });
});
