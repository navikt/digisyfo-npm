import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Varselstripe, { getIkon } from '../../js/components/Varselstripe';

describe("Varselstripe", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            "APP_ROOT": '/sykefravaer',
        };
    })

    it("Skal vise children", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.contains(<p>Info</p>)).to.be.true;
    });

    it("Skal vise ikon som img", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.find("img")).to.have.length(1);
    })


    it("Skal vise riktig ikon når ikon er innsendt", () => {
        const comp = mount(<Varselstripe ikon="fiskekake.jpg"></Varselstripe>)
        expect(comp.find("img").prop("src")).to.equal("fiskekake.jpg");
    });

    describe("getIkon", () => {
        it("Skal vise riktig ikon når type === suksess", () => {
            expect(getIkon('suksess')).to.equal("/sykefravaer/img/svg/suksess.svg")
        });

        it("Skal vise riktig ikon når type === feil", () => {
            expect(getIkon('feil')).to.equal("/sykefravaer/img/svg/utropstegn.svg")
        });

        it("Skal vise riktig ikon når type === info", () => {
            expect(getIkon('info')).to.equal("/sykefravaer/img/svg/informasjon.svg")
        });

        it("Skal vise riktig ikon når type === undefined", () => {
            expect(getIkon()).to.equal("/sykefravaer/img/svg/informasjon.svg")
        });
    });

});