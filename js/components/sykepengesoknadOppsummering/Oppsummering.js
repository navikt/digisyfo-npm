import React from 'react';
import FravaerOgFriskmelding from './FravaerOgFriskmelding';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import { Avkrysset } from './opplysninger';
import { getLedetekst } from '../../ledetekster';
import { keyValue, sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

export const ArbeidsgiverForskutterer = ({ sykepengesoknad }) => {
    if (sykepengesoknad.arbeidsgiverForskutterer === null || sykepengesoknad.arbeidsgiverForskutterer === undefined) {
        return null;
    }
    return (<div className="oppsummering__seksjon js-arbeidsgiverForskutterer">
        <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.forskutterer-arbeidsgiver.sporsmal')}</h3>
        <Avkrysset tekst={getLedetekst(`sykepengesoknad.forskutterer-arbeidsgiver.svar.${sykepengesoknad.arbeidsgiverForskutterer}`)} />
    </div>);
};

ArbeidsgiverForskutterer.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const Oppsummering = ({ sykepengesoknad, ledetekster }) => {
    return (<div className="oppsummering__seksjoner">
        <div className="oppsummering__seksjon">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.bekreft-ansvar.label', ledetekster)} />
        </div>
        <FravaerOgFriskmelding sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <AktiviteterISykmeldingsperioden sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <ArbeidsgiverForskutterer sykepengesoknad={sykepengesoknad} />
    </div>);
};

Oppsummering.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: keyValue,
};

export default Oppsummering;
