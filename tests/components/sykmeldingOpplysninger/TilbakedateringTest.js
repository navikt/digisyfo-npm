import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mock/mockLedetekster.js";
import { getParsetSykmelding } from "../../mock/mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Tilbakedatering from "../../../js/components/sykmeldingOpplysninger/Tilbakedatering.js";

let component;

describe("Tilbakedatering", () => {

    describe("dokumenterbarPasientkontakt", () => {

        it("Skal vise dersom sykmelding.dokumenterbarPasientkontakt === (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getParsetSykmelding({
                tilbakedatering: {
                    dokumenterbarPasientkontakt: new Date("2015-12-31")
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-dokumenterbarPasientkontakt").text()).to.equal("31.12.2015")
        });

        it("Skal ikke vise dersom sykmelding.dokumenterbarPasientkontakt !== (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getParsetSykmelding({
                tilbakedatering: {
                    dokumenterbarPasientkontakt: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-dokumenterbarPasientkontakt").length).to.equal(0);
        });        

    }); 

    describe("tilbakedatertBegrunnelse", () => {

            it("Skal vise dersom sykmelding.tilbakedatertBegrunnelse === (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getParsetSykmelding({
                tilbakedatering: {
                    tilbakedatertBegrunnelse: "God grunn"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilbakedatertBegrunnelse").text()).to.equal("God grunn")
        });

        it("Skal ikke vise dersom sykmelding.tilbakedatertBegrunnelse !== (dato)", () => {
            let component = shallow(<Tilbakedatering sykmelding={getParsetSykmelding({
                tilbakedatering: {
                    tilbakedatertBegrunnelse: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-tilbakedatertBegrunnelse").length).to.equal(0);
        });        

    });

     
}); 