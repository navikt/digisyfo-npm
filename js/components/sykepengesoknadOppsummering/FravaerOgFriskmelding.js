import React from 'react';
import PropTypes from 'prop-types';
import { Avkrysset } from './opplysninger';
import { getLedetekst } from '../../ledetekster';
import { getTomDato, finnFomForFeriesporsmal } from '../../utils/sykepengesoknadUtils';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { keyValue, sykepengesoknad as sykepengesoknadPt, soknadperiode as periodePt } from '../../propTypes';


export const Perioder = ({ perioder, ledetekster }) => {
    return (<ul className="oppsummering__perioder js-perioder">
        {
            perioder.map((periode, index) => {
                return (<li key={index}>
                    <span className="oppsummering__fom">{getLedetekst('sykepengesoknad.oppsummering.periode.fra', ledetekster)} {toDatePrettyPrint(periode.fom)} </span>
                    <span className="oppsummering__tom">{getLedetekst('sykepengesoknad.oppsummering.periode.til', ledetekster)} {toDatePrettyPrint(periode.tom)}</span>
                </li>);
            })
        }
    </ul>);
};

Perioder.propTypes = {
    perioder: PropTypes.arrayOf(periodePt),
    ledetekster: keyValue,
};

const Egenmeldingsdager = ({ sykepengesoknad, ledetekster }) => {
    return (<div className="js-egenmeldingsdager oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.egenmeldingsdager.janei.sporsmal', ledetekster, {
            '%DATO%': toDatePrettyPrint(sykepengesoknad.identdato),
        })}</h3>
        <Avkrysset tekst={sykepengesoknad.egenmeldingsperioder.length > 0 ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        {sykepengesoknad.egenmeldingsperioder.length > 0 && <Perioder perioder={sykepengesoknad.egenmeldingsperioder} ledetekster={ledetekster} /> }
    </div>);
};

Egenmeldingsdager.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: keyValue,
};

const GjenopptattArbeidFulltUt = ({ sykepengesoknad, ledetekster }) => {
    return (<div className="js-gjenopptattArbeid oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal', ledetekster, {
            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
        })}</h3>
        <Avkrysset tekst={sykepengesoknad.gjenopptattArbeidFulltUtDato ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        {sykepengesoknad.gjenopptattArbeidFulltUtDato && <p className="oppsummering__dato">Den {toDatePrettyPrint(sykepengesoknad.gjenopptattArbeidFulltUtDato)}</p>}
    </div>);
};

GjenopptattArbeidFulltUt.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: keyValue,
};

const Ferie = ({ perioder, ledetekster }) => {
    return (<div className="js-ferie">
        <Avkrysset tekst={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie', ledetekster)} />
        <Perioder perioder={perioder} ledetekster={ledetekster} />
    </div>);
};

Ferie.propTypes = {
    perioder: PropTypes.arrayOf(periodePt),
    ledetekster: keyValue,
};

const Permisjon = ({ perioder, ledetekster }) => {
    return (<div className="js-permisjon blokk">
        <Avkrysset tekst={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon', ledetekster)} />
        <Perioder perioder={perioder} ledetekster={ledetekster} />
    </div>);
};

Permisjon.propTypes = {
    perioder: PropTypes.arrayOf(periodePt),
    ledetekster: keyValue,
};

const Utenlandsopphold = ({ perioder, soektOmSykepengerIPerioden, ledetekster }) => {
    return (<div className="js-utenlandsopphold">
        <Avkrysset tekst={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge', ledetekster)} />
        <Perioder perioder={perioder} ledetekster={ledetekster} />
        <div className="js-utenlandsoppholdSoktOmSykepenger oppsummering__tilleggssvar">
            <h5 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal', ledetekster)}</h5>
            <Avkrysset tekst={soektOmSykepengerIPerioden ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        </div>
    </div>);
};

Utenlandsopphold.propTypes = {
    soektOmSykepengerIPerioden: PropTypes.bool,
    perioder: PropTypes.arrayOf(periodePt),
    ledetekster: keyValue,
};

export const FeriePermisjonEllerUtenlandsopphold = ({ sykepengesoknad, ledetekster }) => {
    const harHattFerie = sykepengesoknad.ferie && sykepengesoknad.ferie.length > 0;
    const harHattPermisjon = sykepengesoknad.permisjon && sykepengesoknad.permisjon.length > 0;
    const harHattUtenlandsopphold = sykepengesoknad.utenlandsopphold && sykepengesoknad.utenlandsopphold.perioder && sykepengesoknad.utenlandsopphold.perioder.length > 0;
    const harHattFeriePermisjonEllerUtenlandsopphold = harHattFerie || harHattPermisjon || harHattUtenlandsopphold;
    const senesteTom = getTomDato(sykepengesoknad);
    const fom = finnFomForFeriesporsmal(sykepengesoknad);

    return (<div className="js-feriePermisjonUtenlandsopphold oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal', ledetekster, {
            '%FOM%': toDatePrettyPrint(fom),
            '%TOM%': toDatePrettyPrint(senesteTom),
        })}</h3>
        <Avkrysset tekst={harHattFeriePermisjonEllerUtenlandsopphold ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        {
            harHattFeriePermisjonEllerUtenlandsopphold &&
                <h4 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har', ledetekster)}</h4>
        }
        {
            harHattFerie && <Ferie perioder={sykepengesoknad.ferie} ledetekster={ledetekster} />
        }
        {
            harHattPermisjon && <Permisjon perioder={sykepengesoknad.permisjon} ledetekster={ledetekster} />
        }
        {
            harHattUtenlandsopphold && <Utenlandsopphold
                perioder={sykepengesoknad.utenlandsopphold.perioder}
                soektOmSykepengerIPerioden={sykepengesoknad.utenlandsopphold.soektOmSykepengerIPerioden}
                ledetekster={ledetekster} />
        }
    </div>);
};

FeriePermisjonEllerUtenlandsopphold.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: keyValue,
};

const FravaerOgFriskmelding = ({ sykepengesoknad, ledetekster }) => {
    return (<div id="fravaer-og-friskmelding" className="oppsummering__seksjon">
        <Egenmeldingsdager sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <GjenopptattArbeidFulltUt sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <FeriePermisjonEllerUtenlandsopphold sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
    </div>);
};

FravaerOgFriskmelding.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: keyValue,
};

export default FravaerOgFriskmelding;
