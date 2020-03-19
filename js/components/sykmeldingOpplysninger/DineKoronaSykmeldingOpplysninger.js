import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';
import { getLedetekst } from '../../ledetekster';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import SykmeldingPerioder from './SykmeldingPerioder';
import '../../../less/_korona.less';

const DineKoronaSykmeldingOpplysninger = ({
    sykmelding,
    ledetekster,
    Overskrift = 'h2',
}) => {
    return (
        <div className="dine-opplysninger">
            <Overskrift className="js-din-sykmelding-tittel typo-innholdstittel blokk-l">Egenerklæring</Overskrift>
            <div className="blokk-l side-innhold fjern-margin-bottom">
                <SykmeldingPerioder
                    perioder={sykmelding.mulighetForArbeid.perioder}
                    ledetekster={ledetekster}
                />
                {sykmelding.diagnose.hoveddiagnose ? (
                    <div className="hoveddiagnose">
                        <div className="rad-container">
                            <SykmeldingNokkelOpplysning
                                className="nokkelopplysning--hoveddiagnose"
                                tittel={getLedetekst(
                                    'din-sykmelding.diagnose.tittel',
                                    ledetekster,
                                )}
                            >
                                <div>
                                    <p className="js-hoveddiagnose">
                                        {sykmelding.diagnose.hoveddiagnose.diagnose}
                                    </p>
                                    <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--mobil">
                                        {getLedetekst('din-sykmelding.diagnose.meta', ledetekster)}
                                    </p>
                                </div>
                            </SykmeldingNokkelOpplysning>
                            <div className="nokkelopplysning nokkelopplysning--hoveddiagnose js-hoveddiagnose-kode-container">
                                <div className="medHjelpetekst">
                                    <h3 className="nokkelopplysning__tittel">
                                        {getLedetekst(
                                            'din-sykmelding.diagnosekode.tittel',
                                            ledetekster,
                                        )}
                                    </h3>
                                    <Hjelpetekst>
                                        {getLedetekst(
                                            'din-sykmelding.diagnosekode.hjelpetekst.tekst',
                                            ledetekster,
                                        )}
                                    </Hjelpetekst>
                                </div>
                                <p>
                                    <span className="js-hoveddiagnose-kode">
                                        {sykmelding.diagnose.hoveddiagnose.diagnosekode}
                                    </span>
                  &nbsp;
                                    <span className="js-hoveddiagnose-system">
                                        {sykmelding.diagnose.hoveddiagnose.diagnosesystem}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--desktop">
                            {getLedetekst('din-sykmelding.diagnose.meta', ledetekster)}
                        </p>
                    </div>
                ) : null}
                {sykmelding.arbeidsgiver ? (
                    <SykmeldingNokkelOpplysning tittel="Arbeidsgiver">
                        <div>
                            <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                            <p className="js-stillingsprosent">
                                {getLedetekst('din-sykmelding.stillingsprosent', ledetekster, {
                                    '%STILLINGSPROSENT%': sykmelding.stillingsprosent,
                                })}
                            </p>
                        </div>
                    </SykmeldingNokkelOpplysning>
                ) : null}
            </div>
        </div>
    );
};

DineKoronaSykmeldingOpplysninger.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
    Overskrift: PropTypes.string,
};
export default DineKoronaSykmeldingOpplysninger;
