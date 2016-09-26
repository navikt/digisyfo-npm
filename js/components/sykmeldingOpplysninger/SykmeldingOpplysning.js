import React, { PropTypes } from 'react';

export const SykmeldingOpplysning = ({ tittel, children, Overskrift = 'H5', className = '' }) => {
    return (
        <div className={`opplysning ${className}`}>
            {tittel ? <Overskrift dangerouslySetInnerHTML={{ __html: tittel }} /> : null}
            {children}
        </div>
    );
};

SykmeldingOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};

export const SykmeldingNokkelOpplysning = ({ tittel, children, Overskrift = 'H3', className = '' }) => {
    return (
        <div className={`nokkelopplysning ${className}`}>
            {tittel ? <Overskrift dangerouslySetInnerHTML={{ __html: tittel }} /> : null}
            {children}
        </div>
    );
};

SykmeldingNokkelOpplysning.propTypes = {
    tittel: PropTypes.string.isRequired,
    children: PropTypes.object,
    Overskrift: PropTypes.string,
    className: PropTypes.string,
};
