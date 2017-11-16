import React from 'react';
import PropTypes from 'prop-types';

const Forrige = ({ onClick, url }) => {
    return <a className="stegnavigasjon__bla stegnavigasjon__bla--forrige" href={url} onClick={onClick}>Forrige</a>;
};

Forrige.propTypes = {
    onClick: PropTypes.func,
    url: PropTypes.string.isRequired,
};

const Neste = ({ onClick, url }) => {
    return <a className="stegnavigasjon__bla stegnavigasjon__bla--neste" href={url} onClick={onClick}>Neste</a>;
};

Neste.propTypes = {
    onClick: PropTypes.func,
    url: PropTypes.string.isRequired,
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
                url={stegliste[aktivtSteg - 1].url}
                onClick={(e) => {
                    onClick(aktivtSteg - 1, e);
                }} />)
        }
        {
            aktivtSteg !== stegliste.length - 1 && !disabled && (<Neste
                url={stegliste[aktivtSteg + 1].url}
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
