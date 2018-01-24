import React from 'react';
import SoknadOppsummering, { Sporsmal, Tilleggstekst } from './Oppsummering';
import { sykepengesoknadoppsummeringsporsmal, sykepengesoknadoppsummeringtilleggstekst } from '../../propTypes/';

export const VaerKlarOverAt = ({ vaerKlarOverAt }) => {
    return (<Tilleggstekst tilleggstekst={vaerKlarOverAt} stylingklasser="panel blokk js-vaer-klar-over-at" />);
};

VaerKlarOverAt.propTypes = {
    vaerKlarOverAt: sykepengesoknadoppsummeringtilleggstekst,
};

export const BekreftetKorrektInformasjon = ({ bekreftetKorrektInformasjon }) => {
    return <Sporsmal sporsmal={bekreftetKorrektInformasjon} />;
};

BekreftetKorrektInformasjon.propTypes = {
    bekreftetKorrektInformasjon: sykepengesoknadoppsummeringsporsmal,
};

export { SoknadOppsummering };
