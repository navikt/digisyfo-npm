import React from 'react';
import { getLedetekst } from '../../ledetekster';
import { getSykmeldingOpplysning } from '../../utils';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';
import {SykmeldingOpplysning} from "./SykmeldingOpplysning";

const UtdypendeOpplysninger = ({sykmelding, ledetekster}) => {
    const visSeksjon = sykmelding.utdypendeOpplysninger.sykehistorie ||
        sykmelding.utdypendeOpplysninger.paavirkningArbeidsevne ||
        sykmelding.utdypendeOpplysninger.resultatAvBehandling ||
        sykmelding.utdypendeOpplysninger.henvisningUtredningBehandling;

    if (sykmelding.utdypendeOpplysninger.grupper) {
        return (<div className="sykmeldingSeksjon">
            <h4 className="sykmeldingSeksjon__tittel">{getLedetekst('din-sykmelding.utdypende.tittel', ledetekster)}</h4>

            {sykmelding.utdypendeOpplysninger.grupper.map(gruppe => {
                return gruppe.sporsmal.map((sporsmal) => {
                    return <SykmeldingOpplysning tittel={getLedetekst(`din-sykmelding.utdypende.${sporsmal.id}.tittel`, ledetekster)}
                        ><p className={`opplysning__verdi`}>{sporsmal.svar}</p>
                    </SykmeldingOpplysning>;
                });
            })}
        </div>);
    } else {
        if (!visSeksjon) {
            return <span/>;
        }
        return (
            <div className="sykmeldingSeksjon">
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'sykehistorie',
                        getLedetekst('din-sykmelding.utdypende.sykehistorie.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'paavirkningArbeidsevne',
                        getLedetekst('din-sykmelding.utdypende.paavirkning.arbeidsevne.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'resultatAvBehandling',
                        getLedetekst('din-sykmelding.utdypende.behandlingsresultat.tittel', ledetekster))
                }
                {
                    getSykmeldingOpplysning(sykmelding.utdypendeOpplysninger,
                        'henvisningUtredningBehandling',
                        getLedetekst('din-sykmelding.utdypende.henvisning.tittel', ledetekster))
                }
            </div>);
    }
};

UtdypendeOpplysninger.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
};

export default UtdypendeOpplysninger;
