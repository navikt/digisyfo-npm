import React, { PropTypes } from 'react';
import { Avkrysset } from './opplysninger';
import { tidligsteFom } from '../../utils/periodeUtils';
import { getLedetekst } from '../../ledetekster';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { getTomDato } from '../../utils/sykepengesoknadUtils';

const getLedetekstPrefix = (aktivitet) => {
    return aktivitet.grad === 100 ? 'sykepengesoknad.aktiviteter.ugradert' : 'sykepengesoknad.aktiviteter.gradert';
};

export const getInntektskildeLabel = (field, ledetekster) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${field}.label`, ledetekster);
};

export const Avvik = ({ aktivitet, arbeidsgiver, ledetekster }) => {
    const { arbeidsgrad, timer, arbeidstimerNormalUke } = aktivitet.avvik;
    const antall = arbeidsgrad ? `${arbeidsgrad}` : `${timer}`;
    const nokkel = arbeidsgrad ? 'sykepengesoknad.angi-tid.antall.label.prosent' : 'sykepengesoknad.angi-tid.antall.label.timer';
    const antallMedLabel = `${String(antall).replace('.', ',')} ${getLedetekst(nokkel, ledetekster)}`;
    return (<div className="js-avvik">
        <div>
            <h4 className="oppsummering__sporsmal">{
                getLedetekst('sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet', ledetekster, {
                    '%ARBEIDSGIVER%': arbeidsgiver,
                })
            }</h4>
            <p>{antallMedLabel}</p>
        </div>
        <div>
            <h4 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.sporsmal', ledetekster)}</h4>
            <p>{getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.label-med-verdi', ledetekster, { '%ANTALL%': String(arbeidstimerNormalUke).replace('.', ',') })}</p>
        </div>
    </div>);
};

Avvik.propTypes = {
    aktivitet: PropTypes.object,
    arbeidsgiver: PropTypes.string,
    ledetekster: PropTypes.object,
};

export const Aktivitet = ({ aktivitet, ledetekster, arbeidsgiver, gjenopptattArbeidFulltUtDato }) => {
    const ledetekstPrefix = getLedetekstPrefix(aktivitet);
    let tom = aktivitet.periode.tom;

    if (gjenopptattArbeidFulltUtDato) {
        tom = new Date(gjenopptattArbeidFulltUtDato - (1000 * 60 * 60 * 24));
        if (gjenopptattArbeidFulltUtDato.getTime() === new Date(aktivitet.periode.fom).getTime()) {
            tom = gjenopptattArbeidFulltUtDato;
        }
    }

    return (<div className="oppsummering__bolk js-aktivitet">
        <p className="oppsummering__sporsmal">
        {
            getLedetekst(`${ledetekstPrefix}.intro`, ledetekster, {
                '%FOM%': toDatePrettyPrint(aktivitet.periode.fom),
                '%TOM%': toDatePrettyPrint(tom),
                '%ARBEIDSGIVER%': arbeidsgiver,
                '%ARBEIDSGRAD%': 100 - aktivitet.grad,
            })
        }
        </p>
        <h3 className="oppsummering__sporsmal">{getLedetekst(`${ledetekstPrefix}.sporsmal`, ledetekster)}</h3>
        <Avkrysset tekst={aktivitet.avvik ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        {
            aktivitet.avvik && <Avvik aktivitet={aktivitet} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />
        }
    </div>);
};

Aktivitet.propTypes = {
    ledetekster: PropTypes.object,
    aktivitet: PropTypes.object,
    arbeidsgiver: PropTypes.string,
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

export const Aktiviteter = ({ sykepengesoknad, ledetekster }) => {
    return (<div id="aktiviteter">
        {sykepengesoknad.aktiviteter.map((aktivitet, index) => {
            return <Aktivitet aktivitet={aktivitet} arbeidsgiver={sykepengesoknad.arbeidsgiver.navn} ledetekster={ledetekster} key={index} gjenopptattArbeidFulltUtDato={sykepengesoknad.gjenopptattArbeidFulltUtDato} />;
        })}
    </div>);
};

Aktiviteter.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

const AndreInntektskilderListe = ({ inntektskilder, ledetekster }) => {
    return (<div className="oppsummering__bolk" id="andre-inntektskilder-liste">
        {
            inntektskilder.map((k, index) => {
                return (<div key={index} className="js-annen-inntektskilde">
                    <Avkrysset tekst={getInntektskildeLabel(k.annenInntektskildeType, ledetekster)} />
                    {
                        k.annenInntektskildeType !== 'ANNET' && <div className="js-inntektskilde-sykmeldt oppsummering__tilleggssvar">
                            <h5 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.andre-inntektskilder.er-du-sykmeldt-fra-dette.sporsmal', ledetekster)}</h5>
                            <Avkrysset tekst={k.sykmeldt ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
                        </div>
                    }
                </div>);
            })
        }
    </div>);
};

AndreInntektskilderListe.propTypes = {
    inntektskilder: PropTypes.array,
    ledetekster: PropTypes.object,
};

export const Inntektskilder = ({ sykepengesoknad, ledetekster }) => {
    return (<div id="inntektskilder">
        <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.andre-inntektskilder.janei.sporsmal', ledetekster, {
            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
        })}</h3>
        <Avkrysset tekst={sykepengesoknad.andreInntektskilder.length > 0 ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        {
            sykepengesoknad.andreInntektskilder.length > 0 &&
                <h4 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.sporsmal', ledetekster)}</h4>
        }
        {
            sykepengesoknad.andreInntektskilder.length > 0 &&
                <AndreInntektskilderListe inntektskilder={sykepengesoknad.andreInntektskilder} ledetekster={ledetekster} />
        }
    </div>);
};

Inntektskilder.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const Utdanning = ({ sykepengesoknad, ledetekster }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const sluttdato = getTomDato(sykepengesoknad);
    return (<div id="oppsummering-utdanning">
        <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.utdanning.ja-nei.sporsmal', ledetekster, {
            '%STARTDATO%': toDatePrettyPrint(tidligsteFom(perioder)),
            '%SLUTTDATO%': toDatePrettyPrint(sluttdato),
        })}</h3>
        <Avkrysset tekst={sykepengesoknad.utdanning ? getLedetekst('sykepengesoknad.ja', ledetekster) : getLedetekst('sykepengesoknad.nei', ledetekster)} />
        {
            sykepengesoknad.utdanning && (<div className="js-utdanning-start">
                <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.utdanning.startdato.sporsmal', ledetekster)}</h3>
                <p>Den {toDatePrettyPrint(sykepengesoknad.utdanning.utdanningStartdato)}</p>
            </div>)
        }
        {
            sykepengesoknad.utdanning && (<div className="js-utdanning-fulltid">
                <h3 className="oppsummering__sporsmal">{getLedetekst('sykepengesoknad.utdanning.fulltidsstudium.sporsmal', ledetekster)}</h3>
                <Avkrysset
                    tekst={sykepengesoknad.utdanning.erUtdanningFulltidsstudium
                        ? getLedetekst('sykepengesoknad.ja', ledetekster)
                        : getLedetekst('sykepengesoknad.nei', ledetekster)}
                />
            </div>)
        }
    </div>);
};

Utdanning.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

const AktiviteterISykmeldingsperioden = ({ sykepengesoknad, ledetekster }) => {
    return (<div id="aktiviteter-i-sykmeldingsperioden">
        <Aktiviteter sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <Inntektskilder sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <Utdanning sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
    </div>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    sykepengesoknad: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default AktiviteterISykmeldingsperioden;
