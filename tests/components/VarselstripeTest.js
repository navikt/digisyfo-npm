import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Varselstripe, { getIkon, getAlt } from '../../js/components/Varselstripe';

describe("Varselstripe", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            "APP_ROOT": '/sykefravaer',
        };
    });

    it("Skal vise children", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.contains(<p>Info</p>)).to.be.true;
    });

    it("Skal vise ikon som img", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.find("img")).to.have.length(1);
    })

    it("Skal vise ikon med alt-tekst", () => {
        const comp = mount(<Varselstripe type="suksess"><p>Suksess</p></Varselstripe>);
        expect(comp.find("img").prop("alt")).to.equal("Suksess");
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

    describe("getAlt", () => {
        it("Skal returnere riktig tekst når type === suksess", () => {
            expect(getAlt('suksess')).to.equal("Suksess")
        });

        it("Skal returnere riktig tekst når type === feil", () => {
            expect(getAlt('feil')).to.equal("Feil")
        });

        it("Skal returnere riktig tekst når type === info", () => {
            expect(getAlt('info')).to.equal("Informasjon")
        });

        it("Skal returnere riktig tekst når type === undefined", () => {
            expect(getAlt()).to.equal("")
        });
    });

});