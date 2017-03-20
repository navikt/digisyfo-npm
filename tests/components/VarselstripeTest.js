import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Varselstripe, { getIkon, getAlt } from '../../js/components/Varselstripe';
import { InfoIkon, InfoIkonFylt, SuksessIkon, SuksessIkonFylt, UtropstegnIkon } from '../../js/components/ikoner';

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

    it("Skal vise ikon", () => {
        const comp = mount(<Varselstripe><p>Info</p></Varselstripe>);
        expect(comp.find(InfoIkon)).to.have.length(1);
    });

    it("Skal vise fylt ikon", () => {
        const comp = mount(<Varselstripe fylt><p>Info</p></Varselstripe>);
        expect(comp.find(InfoIkonFylt)).to.have.length(1);
    })

    it("Skal vise riktig ikon når ikon er innsendt", () => {
        const comp = mount(<Varselstripe ikon="fiskekake.jpg"></Varselstripe>)
        expect(comp.find("img").prop("src")).to.equal("fiskekake.jpg");
    });

    describe("getIkon", () => {
        it("Skal vise riktig ikon når type === suksess", () => {
            expect(getIkon('suksess')).to.deep.equal(<SuksessIkon />)
        });

        it("Skal vise riktig ikon når type === suksess og fylt = true", () => {
            expect(getIkon('suksess', true)).to.deep.equal(<SuksessIkonFylt />)
        });

        it("Skal vise riktig ikon når type === feil", () => {
            expect(getIkon('feil')).to.deep.equal(<UtropstegnIkon />)
        });

        it("Skal vise riktig ikon når type === info", () => {
            expect(getIkon('info')).to.deep.equal(<InfoIkon />)
        });

        it("Skal vise riktig ikon når type === undefined", () => {
            expect(getIkon()).to.deep.equal(<InfoIkon />)
        });
    });

});