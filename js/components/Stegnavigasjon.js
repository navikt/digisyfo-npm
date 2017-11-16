import React from 'react';
import PropTypes from 'prop-types';

const Forrige = ({ onClick }) => {
    return <a className="stegnavigasjon__bla stegnavigasjon__bla--forrige" href="#" onClick={onClick}>Forrige</a>;
};

Forrige.propTypes = {
    onClick: PropTypes.func,
};

const Neste = ({ onClick }) => {
    return <a className="stegnavigasjon__bla stegnavigasjon__bla--neste" href="#" onClick={onClick}>Neste</a>;
};

Neste.propTypes = {
    onClick: PropTypes.func,
};

const Stegnavigasjon = ({ aktivtSteg, settAktivtSteg, disabled = false, stegliste }) => {
    const LinkEl = disabled ? 'span' : 'a';

    const onClick = (steg, event) => {
        event.preventDefault();
        if (disabled) {
            return;
        }
        settAktivtSteg(steg);
    };

    const listeClassNames = ['stegnavigasjon__trinnliste'];

    if (disabled) {
        listeClassNames.push('stegnavigasjon__trinnliste--inaktiv');
    }

    return (<div className="stegnavigasjon">
        <ul className={listeClassNames.join(' ')} role="tablist" data-aktiv={aktivtSteg}>
            {
                stegliste.map(({ url, tekst }, i) => {
                    const classNames = ['stegnavigasjon__trinn'];
                    if (i === aktivtSteg) {
                        classNames.push('stegnavigasjon__trinn--aktivt');
                    }
                    return (<li className={classNames.join(' ')} key={`steg-${i}`}>
                        <LinkEl
                            className="stegnavigasjon__lenke"
                            role="tab"
                            aria-disabled={disabled}
                            aria-selected={i === aktivtSteg}
                            href={LinkEl === 'a' ? url : null}
                            onClick={(e) => {
                                onClick(i, e);
                            }}>{tekst}</LinkEl>
                    </li>);
                })
            }
        </ul>
        {
            aktivtSteg !== 0 && !disabled && (<Forrige
                onClick={(e) => {
                    onClick(aktivtSteg - 1, e);
                }} />)
        }
        {
            aktivtSteg !== stegliste.length - 1 && !disabled && (<Neste
                onClick={(e) => {
                    onClick(aktivtSteg + 1, e);
                }} />)
        }
    </div>);
};

Stegnavigasjon.propTypes = {
    aktivtSteg: PropTypes.number.isRequired,
    settAktivtSteg: PropTypes.func,
    disabled: PropTypes.bool,
    stegliste: PropTypes.arrayOf(PropTypes.shape({
        tekst: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })),
};

export default Stegnavigasjon;
