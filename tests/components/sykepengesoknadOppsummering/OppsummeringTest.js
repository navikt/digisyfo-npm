import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';

import Oppsummering from '../../../js/components/sykepengesoknadOppsummering/Oppsummering';
import { getParsetSoknad } from "../../mock/mockSoknader.js";

describe("Oppsummering", () => {

    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getParsetSoknad();
    })

    it("Skal ikke vise info om arbeidsgiver forskutterer hvis spørsmålet ikke er stilt", () => {
        const component = mount(<Oppsummering sykepengesoknad={sykepengesoknad} />);
        expect(component.find(".js-arbeidsgiverForskutterer")).to.have.length(0);
    });

    it("Skal ikke vise info om arbeidsgiver forskutterer hvis spørsmålet er stilt og besvart", () => {
        sykepengesoknad.arbeidsgiverForskutterer = "JA";
        const component = mount(<Oppsummering sykepengesoknad={sykepengesoknad} />);
        expect(component.find(".js-arbeidsgiverForskutterer")).to.have.length(1);
    });

});