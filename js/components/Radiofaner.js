import React, { PropTypes } from 'react';
import Hjelpetekst from './Hjelpetekst';

const Radiofaner = ({ alternativer = [], valgtAlternativ, changeHandler, className, radioName }) => {
    return (<div className="radiofaner">
        <ul className={`radiofaner__valg ${className}`}>
            {
                alternativer.map((a, index) => {
                    const erValgt = a.verdi === valgtAlternativ;
                    const liClassName = a.hjelpetekst ? ' skjema__input--medHjelpetekst' : '';
                    return (<li className={`skjema__input${liClassName}`} key={index}>
                        <input
                            type="radio"
                            className={`radioknapp radioknapp--mork js-${a.verdi}`}
                            name={radioName}
                            value={a.verdi}
                            id={`radio-${a.verdi}`}
                            checked={erValgt}
                            onChange={() => {changeHandler(a.verdi);}} />
                        <label htmlFor={`radio-${a.verdi}`}>{a.tittel}</label>
                        {
                            a.hjelpetekst ?
                            <Hjelpetekst id="velg-arbeidssituasjon" {...a.hjelpetekst} /> : null
                        }
                    </li>);
                })
            }
        </ul>
    </div>);
};

Radiofaner.propTypes = {
    alternativer: PropTypes.array,
    changeHandler: PropTypes.func,
    valgtAlternativ: PropTypes.string,
    className: PropTypes.string,
    radioName: PropTypes.string,
};

export default Radiofaner;
