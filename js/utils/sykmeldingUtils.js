import React from 'react';
import { SykmeldingOpplysning } from '../components/sykmeldingOpplysninger/SykmeldingOpplysning';
import { SykmeldingCheckbox } from '../components/sykmeldingOpplysninger/SykmeldingCheckbox';
import { toDate, getDuration, sorterPerioderEldsteFoerst } from './index';

export const hentPerioderForSykmelding = (sykmelding) => {
    return sykmelding.mulighetForArbeid
        ? sykmelding.mulighetForArbeid.perioder
        : sykmelding.sykmeldingsperioder;
};

export const getSykmeldingCheckbox = (sykmeldingBolk, felt, tekst, className) => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingCheckbox tekst={tekst} jsClassName={felt} className={className} />);
    }
    return null;
};

export const getSykmeldingOpplysning = (sykmeldingBolk, felt, tittel, opplysning, Overskrift = 'h5') => {
    if (sykmeldingBolk[felt]) {
        return (<SykmeldingOpplysning tittel={tittel} Overskrift={Overskrift}>
            <p className={`opplysning__verdi js-${felt}`}>{opplysning || sykmeldingBolk[felt]}</p>
        </SykmeldingOpplysning>);
    }
    return null;
};

export function getSykmelding(sykmeldinger, sykmeldingId) {
    return sykmeldinger.find((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    });
}

export function getPeriodeSpenn(perioder) {
    const forsteStartDato = perioder.sort((a, b) => {
        return toDate(a.fom) - toDate(b.fom);
    })[0].fom;
    const sisteSluttDato = perioder.sort((a, b) => {
        return toDate(b.tom) - toDate(a.tom);
    })[0].tom;
    return getDuration(forsteStartDato, sisteSluttDato);
}

export function getSykmeldingStartdato(sykmelding) {
    const perioder = hentPerioderForSykmelding(sykmelding);
    return sorterPerioderEldsteFoerst(perioder)[0].fom;
}
