import React, { PropTypes } from 'react';
import Hjelpetekst from './Hjelpetekst';

const Radiofaner = ({ alternativer = [], valgtAlternativ, changeHandler, className, radioName }) => {
    return (<div className="radiofaner">
        <ul className={`radiofaner__valg ${className}`}>
            {
                alternativer.map((a, index) => {
                    const erValgt = a.verdi === valgtAlternativ;
                    const divClassname = a.hjelpetekst ? 'medHjelpetekst' : '';
                    return (<li className="skjema__input" key={index}>
                        <div className={divClassname}>
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
                        </div>
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
