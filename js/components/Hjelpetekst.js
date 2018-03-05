import React, { Component } from 'react';
import PropTypes from 'prop-types';

let SET_FOCUS;
let lukk;

class Hjelpetekst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen === true,
            variant: '',
        };
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextState.erApen && nextState.erApen !== this.state.erApen) {
            this.setVariant();
        }
    }

    componentDidUpdate() {
        if (SET_FOCUS) {
            const focusRef = this.state.erApen ? 'js-lukk' : 'js-apne';
            this[focusRef].focus();
            SET_FOCUS = false;
        }
    }

    setVariant() {
        const LIMIT = 330;
        const toggle = this['js-apne'];
        if (toggle) {
            const rect = toggle.getBoundingClientRect();
            const right = window.innerWidth - rect.right;
            if (right < LIMIT) {
                if (right < LIMIT / 2) {
                    this.setState({
                        variant: ' hjelpetekst__tooltip--venstrestilt',
                    });
                } else {
                    this.setState({
                        variant: ' hjelpetekst__tooltip--midtstilt',
                    });
                }
            } else {
                this.setState({
                    variant: '',
                });
            }
        }
    }

    apne() {
        this.setState({
            erApen: true,
        });
        SET_FOCUS = true;
        lukk = () => {
            this.lukk();
            document.removeEventListener('click', lukk);
        };
        document.addEventListener('click', lukk);
    }

    lukk() {
        SET_FOCUS = true;
        this.setState({
            erApen: false,
        });
    }

    toggle() {
        if (this.state.erApen) {
            this.lukk();
        } else {
            this.apne();
        }
    }

    render() {
        const ariaId = `tooltip-${this.props.id}`;
        return (
            <div className="hjelpetekst">
                <button
                    type="button"
                    className="hjelpetekst__apne js-apne"
                    aria-describedby={ariaId}
                    onClick={() => {
                        this.toggle();
                    }}
                    ref={(c) => {
                        this['js-apne'] = c;
                    }}>
                    <span aria-hidden="true">?</span>
                    <span className="vekk">? Hjelpetekst</span>
                </button>
                {
                    !this.state.erApen ? null : <div
                        role="tooltip"
                        id={ariaId}
                        className={`hjelpetekst__tooltip${this.state.variant} js-tooltip`}>
                        {
                            this.props.tittel && <h3 className="hjelpetekst__tittel js-tittel">{this.props.tittel}</h3>
                        }
                        <div className="hjelpetekst__tekst js-tekst">
                            <p>
                                {this.props.tekst}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="hjelpetekst__lukk js-lukk"
                            aria-controls={ariaId}
                            onClick={() => { this.lukk(); }}
                            ref={(c) => {
                                this['js-lukk'] = c;
                            }}>
                            <span className="vekk">Lukk</span>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

Hjelpetekst.propTypes = {
    tittel: PropTypes.string,
    tekst: PropTypes.string,
    id: PropTypes.string,
    erApen: PropTypes.bool,
};

export default Hjelpetekst;
