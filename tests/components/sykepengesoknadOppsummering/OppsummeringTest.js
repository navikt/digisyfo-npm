import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';

import Oppsummering from '../../../js/components/sykepengesoknadOppsummering/Oppsummering';

xdescribe("Oppsummering", () => {

    const data = {
        "id": "f40e50bc-09ba-4480-9b8f-3849efcdb5d2",
        "status": "NY",
        "innsendtDato": null,
        "opprettetDato": new Date("2017-02-03T00:00:00.000Z"),
        "arbeidsgiver": {
            "navn": "LØNNS- OG REGNSKAPSSENTERET",
            "orgnummer": "974739410",
            "naermesteLeder": null
        },
        "identdato": new Date("2017-02-15T00:00:00.000Z"),
        "ansvarBekreftet": true,
        "bekreftetKorrektInformasjon": false,
        "arbeidsgiverUtbetalerLoenn": true,
        "egenmeldingsperioder": [],
        "gjenopptattArbeidFulltUtDato": null,
        "ferie": [],
        "permisjon": [],
        "utenlandsopphold": {
            "perioder": []
        },
        "aktiviteter": [{
            "periode": {
                "fom": new Date("2016-07-15T00:00:00.000Z"),
                "tom": new Date("2016-07-20T00:00:00.000Z")
            },
            "grad": 100,
            "avvik": {
                "enhet": "prosent",
                "arbeidsgrad": "80",
                "arbeidstimerNormalUke": "55"
            },
            "jobbetMerEnnPlanlagt": true
        }],
        "andreInntektskilder": {},
        "utdanning": {
            "underUtdanningISykmeldingsperioden": false
        },
        "bruktEgenmeldingsdagerFoerLegemeldtFravaer": false,
        "harGjenopptattArbeidFulltUt": false,
        "harHattFeriePermisjonEllerUtenlandsopphold": false,
        "harAndreInntektskilder": false
    };

    it("oppsummering skal rendre", () => {
      const res = data;
      const component = mount(<Oppsummering sykepengesoknad={res} ledetekster={{}} />);
    });

    it("skal vise tilbakemeldingsskjema", () => {
        const res = data;
        const component = mount(<Oppsummering sykepengesoknad={res} ledetekster={{}} />);

        expect(component.find('.js-tilbakemelding').to.be.length(1));
    })
});