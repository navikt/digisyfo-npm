import React from 'react';
import PropTypes from 'prop-types';
import { CHECKBOX, RADIOKNAPPER, TEKSTSVAR, DATO, DATOSPENN } from '../../enums/sykepengesoknadsvartyper';
import {
    sykepengesoknadoppsummeringsvar,
    sykepengesoknadoppsummeringsporsmal,
    oppsummeringsoknad as oppsummeringsoknadPt } from '../../propTypes';

const Avkrysset = ({ tekst }) => {
    return (<div className="oppsummering__avkrysset">
        <img src={`${window.APP_SETTINGS.APP_ROOT}/img/png/check-box-1.png`} alt="Avkrysset" />
        <span>{tekst}</span>
    </div>);
};

Avkrysset.propTypes = {
    tekst: PropTypes.string,
};

const Svarliste = ({ svarliste = [], overskriftsnivaa }) => {
    return svarliste.map((svar, index) => {
        const sporsmalsliste = <Undersporsmalsliste undersporsmalsliste={svar.undersporsmal} overskriftsnivaa={overskriftsnivaa} />;
        switch (svar.type) {
            case CHECKBOX:
            case RADIOKNAPPER: {
                return (<div className="oppsummering__svarliste" key={index}>
                    <Avkrysset key={index} tekst={svar.svartekst.tekst} />
                    {sporsmalsliste}
                </div>);
            }
            case TEKSTSVAR: {
                return (<div className="oppsummering__tekstsvar" key={index}>
                    <p key={index} className="oppsummering__tekst">{svar.svartekst.tekst}</p>
                    { svar.beskrivelse && <div dangerouslySetInnerHTML={{ __html: svar.beskrivelse.tekst }} /> }
                    {sporsmalsliste}
                </div>);
            }
            case DATO:
            case DATOSPENN: {
                return (<div className="oppsummering__tekstsvar" key={index}>
                    <p key={index} className="oppsummering__dato">{svar.svartekst.tekst}</p>
                    { svar.beskrivelse && <div dangerouslySetInnerHTML={{ __html: svar.beskrivelse.tekst }} /> }
                    {sporsmalsliste}
                </div>);
            }
            default: {
                return null;
            }
        }
    });
};

Svarliste.propTypes = {
    svarliste: PropTypes.arrayOf(sykepengesoknadoppsummeringsvar),
    overskriftsnivaa: PropTypes.number,
};

const Undersporsmalsliste = ({ undersporsmalsliste, overskriftsnivaa }) => {
    if (!undersporsmalsliste) {
        return null;
    }
    if (undersporsmalsliste.length === 1 && !undersporsmalsliste[0].sporsmalstekst) {
        return <Svarliste svarliste={undersporsmalsliste[0].svar} overskriftsnivaa={overskriftsnivaa} />;
    }
    return (<div className="oppsummering__undersporsmalsliste">
        {
            undersporsmalsliste.map((sporsmal, i) => {
                return <Sporsmal sporsmal={sporsmal} key={i} overskriftsnivaa={overskriftsnivaa} />;
            })
        }
    </div>);
};

Undersporsmalsliste.propTypes = {
    undersporsmalsliste: PropTypes.arrayOf(sykepengesoknadoppsummeringsporsmal),
    overskriftsnivaa: PropTypes.number,
};

export const Sporsmal = ({ sporsmal, overskriftsnivaa = 1 }) => {
    const Overskriftstag = `h${overskriftsnivaa}`;
    if (sporsmal.sporsmalstekst) {
        return (<div className="oppsummering__sporsmalscontainer">
            <Overskriftstag className="oppsummering__sporsmal">{sporsmal.sporsmalstekst.tekst}</Overskriftstag>
            <Svarliste svarliste={sporsmal.svar} overskriftsnivaa={overskriftsnivaa + 1} />
            <Undersporsmalsliste undersporsmalsliste={sporsmal.undersporsmal} overskriftsnivaa={overskriftsnivaa + 1} />
        </div>);
    }
    return <Svarliste svarliste={sporsmal.svar} />;
};

Sporsmal.propTypes = {
    sporsmal: sykepengesoknadoppsummeringsporsmal,
    overskriftsnivaa: PropTypes.number,
};

const SoknadOppsummering = ({ oppsummeringsoknad }) => {
    return (<div className="oppsummering__seksjoner">
        {
            oppsummeringsoknad.oppsummering.map((hovedsporsmal, i) => {
                return (<div className="oppsummering__seksjon" key={`seksjon-${i}`}>
                    <Sporsmal sporsmal={hovedsporsmal} overskriftsnivaa={3} />
                </div>);
            })
        }
    </div>);
};

SoknadOppsummering.propTypes = {
    oppsummeringsoknad: oppsummeringsoknadPt,
};

export default SoknadOppsummering;
