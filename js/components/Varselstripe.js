import React, { PropTypes } from 'react';

export function getAlt(type) {
    switch (type) {
        case 'suksess': {
            return 'Suksess';
        }
        case 'feil': {
            return 'Feil';
        }
        case 'default':
        case 'info': {
            return 'Informasjon';
        }
        default: {
            return '';
        }
    }
}

export function getIkon(type) {
    switch (type) {
        case 'suksess': {
            return `${window.APP_SETTINGS.APP_ROOT}/img/svg/suksess.svg`;
        }
        case 'feil': {
            return `${window.APP_SETTINGS.APP_ROOT}/img/svg/utropstegn.svg`;
        }
        default: {
            return `${window.APP_SETTINGS.APP_ROOT}/img/svg/informasjon.svg`;
        }
    }
}

const Varselstripe = ({ type = 'default', children, ikon, alt }) => {
    const typeClass = `varselstripe--${type}`;
    const typeIkon = getIkon(type);

    return (<div className={`varselstripe ${(type ? typeClass : '')}`}>
        <div className="varselstripe__ikon">
            <img src={ikon || typeIkon} alt={alt || getAlt(type)} />
        </div>
        {children}
    </div>);
};

Varselstripe.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
    ikon: PropTypes.string,
};

export default Varselstripe;
