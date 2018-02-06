import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LightBox from '../LightBox';
import * as toggleActions from '../../actions/toggles_actions';
import { getLedetekst } from '../../ledetekster/index';

export const TimeoutBoxSide = ({ brukerSnartUtlogget, hentToggles }) => {
    if (!brukerSnartUtlogget) {
        return null;
    }
    return (<LightBox>
        <h2 className="panel__tittel">{getLedetekst('sykefravaer.timeout.tittel')}</h2>
        <label className="blokk">{getLedetekst('sykefravaer.timeout.tekst')}</label>
        <div style={{ textAlign: 'center' }}>
            <button type="button" style={{ marginRight: '2em' }} className="knapp" onClick={() => { hentToggles(); }}>{getLedetekst('sykefravaer.timeout.knapp.bli')}</button>
            <a className="rammeknapp" href="/esso/logout">{getLedetekst('sykefravaer.timeout.knapp.logg.ut')}</a>
        </div>
    </LightBox>);
};

TimeoutBoxSide.propTypes = {
    brukerSnartUtlogget: PropTypes.bool,
    hentToggles: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        brukerSnartUtlogget: state.timeout.brukerSnartUtlogget,
        ledetekster: state.ledetekster.henter ? {} : state.ledetekster.data,
    };
}

const TimeoutBox = connect(mapStateToProps, { hentToggles: toggleActions.hentToggles })(TimeoutBoxSide);

export default TimeoutBox;
