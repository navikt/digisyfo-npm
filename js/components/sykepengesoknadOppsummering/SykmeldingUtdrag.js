import React, { PropTypes } from 'react';
import SykmeldingPerioder from '../sykmeldingOpplysninger/SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from '../sykmeldingOpplysninger/SykmeldingOpplysning';
import { Avkrysset } from './opplysninger';
import Utvidbar from '../Utvidbar';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { getLedetekst } from '../../ledetekster';

const SykmeldingUtdrag = ({ erApen, sykepengesoknad, ledetekster }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return {
            fom: aktivitet.periode.fom,
            tom: aktivitet.periode.tom,
            grad: aktivitet.grad,
        };
    });

    return (<div className="blokk">
            <Utvidbar
                Overskrift="h2"
                erApen={erApen}
                visLukklenke={!erApen}
                tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.tittel', ledetekster)}
                variant="lilla" ikon="svg/plaster.svg" ikonHover="svg/plaster_hover.svg" ikonAltTekst="Plaster-ikon">
            <div>
                <SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykepengesoknad.arbeidsgiver.navn}</p>
                </SykmeldingNokkelOpplysning>
                <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet', ledetekster)}>
                    <p className="js-utstedelsesdato">{toDatePrettyPrint(sykepengesoknad.sykmeldingSkrevetDato)}</p>
                </SykmeldingNokkelOpplysning>
            </div>
        </Utvidbar>
    </div>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SykmeldingUtdrag;
