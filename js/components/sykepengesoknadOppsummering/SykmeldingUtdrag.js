import React from 'react';
import PropTypes from 'prop-types';
import SykmeldingPerioder from '../sykmeldingOpplysninger/SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from '../sykmeldingOpplysninger/SykmeldingOpplysning';
import Utvidbar from '../Utvidbar';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { getLedetekst } from '../../ledetekster';
import { keyValue, sykmelding as sykmeldingPt } from '../../propTypes';

const SykmeldingUtdrag = ({ erApen, sykmelding, ledetekster }) => {
    return (<div className="blokk">
        <Utvidbar
            Overskrift="h2"
            erApen={erApen}
            visLukklenke={!erApen}
            tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel', ledetekster)}
            variant="lilla"
            ikon="svg/plaster.svg"
            ikonHover="svg/plaster_hover.svg"
            ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} ledetekster={ledetekster} />
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykmelding.mottakendeArbeidsgiver.navn}</p>
                </SykmeldingNokkelOpplysning>
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet', ledetekster)}>
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykmelding.bekreftelse.utstedelsesdato)}</p>
                </SykmeldingNokkelOpplysning>
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
};

export default SykmeldingUtdrag;
