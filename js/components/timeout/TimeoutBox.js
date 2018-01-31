import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LightBox from '../LightBox';
import { hentToggles } from '../../actions/toggles_actions';
import { snartUtlogget } from '../../actions/timeout_actions';
import { getLedetekst } from '../../ledetekster/index';
import { MILLIES_MELLOM_VIS_BOKS_OG_TIMEOUT } from '../../reducers/timeout';

const startTimer = (milliesToTimeout, performUponTimeout) => {
    return setTimeout(() => {
        performUponTimeout();
    }, milliesToTimeout);
};

export class TimeoutBoxSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupClock: {},
            timeoutClock: {},
        };
        this.startNedtelling();
    }

    componentDidUpdate() {
        if (!this.props.brukerSnartUtlogget) {
            this.startNedtelling();
        }
    }

    milliesToTimeout() {
        return this.props.erInnloggetTil.getTime() - new Date().getTime();
    }

    milliesToPopup() {
        return this.milliesToTimeout() - MILLIES_MELLOM_VIS_BOKS_OG_TIMEOUT;
    }

    startTimeoutClock() {
        clearTimeout(this.state.timeoutClock);
        return startTimer(this.milliesToTimeout(), () => { window.location = '/esso/logout'; });
    }

    startPopupClock() {
        clearTimeout(this.state.popupClock);
        return startTimer(this.milliesToPopup(), () => { this.props.snartUtlogget(); });
    }

    startNedtelling() {
        this.state.popupClock = this.startPopupClock();
        this.state.timeoutClock = this.startTimeoutClock();
    }

    render() {
        if (!this.props.brukerSnartUtlogget) {
            return null;
        }
        return (<LightBox>
            <h2 className="panel__tittel">{getLedetekst('sykefravaer.timeout.tittel')}</h2>
            <label className="blokk">{getLedetekst('sykefravaer.timeout.tekst')}</label>
            <div style={{ textAlign: 'center' }}>
                <button type="button" style={{ marginRight: '2em' }} className="knapp" onClick={() => { this.props.hentToggles(); }}>{getLedetekst('sykefravaer.timeout.knapp.bli')}</button>
                <a className="rammeknapp" href="/esso/logout">{getLedetekst('sykefravaer.timeout.knapp.logg.ut')}</a>
            </div>
        </LightBox>);
    }
}

TimeoutBoxSide.propTypes = {
    erInnloggetTil: PropTypes.instanceOf(Date),
    brukerSnartUtlogget: PropTypes.bool,
    hentToggles: PropTypes.func,
    snartUtlogget: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        erInnloggetTil: state.timeout.erInnloggetTil,
        brukerSnartUtlogget: state.timeout.brukerSnartUtlogget,
    };
}

const TimeoutBox = connect(mapStateToProps, { hentToggles, snartUtlogget })(TimeoutBoxSide);

export default TimeoutBox;
