import React from 'react';
import PropTypes from 'prop-types';
import Oppsummering from './Oppsummering';
import Utvidbar from '../Utvidbar';
import { getHtmlLedetekst } from '../../ledetekster';
import { keyValue, sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const Soknad = ({ ledetekster, sykepengesoknad, apentUtdrag = true, tittel, visVaerKlarOverAt = true }) => {
    return (<div>
        <div className="blokk">
            <Utvidbar tittel={tittel} erApen={apentUtdrag} Overskrift="h2">
                <Oppsummering ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
            </Utvidbar>
        </div>
        {
            visVaerKlarOverAt && <div
                className="panel blokk js-vaer-klar-over-at"
                dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.oppsummering.vaer-klar-over-at', ledetekster)} />
        }
    </div>);
};

Soknad.propTypes = {
    ledetekster: keyValue,
    sykepengesoknad: sykepengesoknadPt,
    apentUtdrag: PropTypes.bool,
    tittel: PropTypes.string,
    visVaerKlarOverAt: PropTypes.bool,
};

export default Soknad;
