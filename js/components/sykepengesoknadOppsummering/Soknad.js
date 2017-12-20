import React from 'react';
import SoknadOppsummering, { Sporsmal } from './Oppsummering';
import { oppsummeringsoknad as oppsummeringsoknadPt } from '../../propTypes';

export { SoknadOppsummering };

export const VaerKlarOverAt = ({ oppsummeringsoknad }) => {
    const tekst = oppsummeringsoknad.ansvarserklaring.beskrivelse.tekst;
    return <div className="panel blokk js-vaer-klar-over-at" dangerouslySetInnerHTML={{ __html: tekst }} />;
};

VaerKlarOverAt.propTypes = {
    oppsummeringsoknad: oppsummeringsoknadPt,
};

export const BekreftetKorrektInformasjon = ({ oppsummeringsoknad }) => {
    return <Sporsmal sporsmal={oppsummeringsoknad.bekreftetKorrektInformasjon} />;
};

BekreftetKorrektInformasjon.propTypes = {
    oppsummeringsoknad: oppsummeringsoknadPt,
};
