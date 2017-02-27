import React, { PropTypes } from 'react';
import Oppsummering from './Oppsummering';
import Utvidbar from '../Utvidbar';
import { getHtmlLedetekst } from '../../ledetekster';

const Soknad = ({ ledetekster, sykepengesoknad, apentUtdrag = true, tittel }) => {
    return (<div>
        <div className="blokk">
            <Utvidbar tittel={tittel} erApen={apentUtdrag} Overskrift="h2">
                <Oppsummering ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
            </Utvidbar>
        </div>
        <div
            className="panel blokk js-vaer-klar-over-at"
            dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.oppsummering.vaer-klar-over-at', ledetekster)} />
    </div>);
};

Soknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
    apentUtdrag: PropTypes.bool,
    tittel: PropTypes.string,
};

export default Soknad;
