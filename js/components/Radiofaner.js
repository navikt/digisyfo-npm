import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from './Hjelpetekst';

const Radiofaner = ({ alternativer = [], valgtAlternativ, changeHandler, className, radioName }) => {
    return (<div className="radiofaner">
        <ul className={`radiofaner__valg ${className}`}>
            {
                alternativer.map((a, index) => {
                    const erValgt = a.verdi === valgtAlternativ;
                    const divClassname = a.hjelpetekst ? 'medHjelpetekst' : '';
                    const inputId = `radio-${a.verdi}`;
                    return (<li className="skjema__input" key={index}>
                        <div className={divClassname}>
                            <input
                                type="radio"
                                className={`radioknapp radioknapp--mork js-${a.verdi}`}
                                name={radioName}
                                value={a.verdi}
                                id={inputId}
                                checked={erValgt}
                                onChange={() => {
                                    changeHandler(a.verdi);
                                }} />
                            <label htmlFor={inputId}>{a.tittel}</label>
                            {
                                a.hjelpetekst ? <Hjelpetekst id="velg-arbeidssituasjon" {...a.hjelpetekst} /> : null
                            }
                        </div>
                    </li>);
                })
            }
        </ul>
    </div>);
};

const alternativ = PropTypes.shape({
    verdi: PropTypes.string,
    tittel: PropTypes.string,
});

Radiofaner.propTypes = {
    alternativer: PropTypes.arrayOf(alternativ),
    changeHandler: PropTypes.func,
    valgtAlternativ: PropTypes.string,
    className: PropTypes.string,
    radioName: PropTypes.string,
};

export default Radiofaner;
