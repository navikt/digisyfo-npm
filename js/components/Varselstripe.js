import React, { PropTypes } from 'react';
import { UtropstegnIkon, UtropstegnIkonFylt, InfoIkonFylt, InfoIkon, SuksessIkonFylt, SuksessIkon } from './ikoner';

export const getIkon = (type, fylt) => {
    switch (type) {
        case 'feil': {
            if (fylt) {
                return <UtropstegnIkonFylt />;
            }
            return <UtropstegnIkon />;
        }
        case 'suksess': {
            if (fylt) {
                return <SuksessIkonFylt />;
            }
            return <SuksessIkon />;
        }
        default: {
            if (fylt) {
                return <InfoIkonFylt />;
            }
            return <InfoIkon />;
        }
    }
};

const Varselstripe = ({ type = 'default', fylt = false, children, ikon }) => {
    const typeClass = ` varselstripe--${type}`;
    const _ikon = ikon ? <img src={ikon} alt="" /> : getIkon(type, fylt);

    return (<div className={`varselstripe${(type ? typeClass : '')}`}>
        <div className="varselstripe__ikon">
            {_ikon}
        </div>
        <div className="varselstripe__innhold">
            {children}
        </div>
    </div>);
};

Varselstripe.propTypes = {
    type: PropTypes.string,
    fylt: PropTypes.bool,
    children: PropTypes.object,
    ikon: PropTypes.string,
};

export default Varselstripe;
