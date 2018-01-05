const senesteTom = (perioder) => {
    return perioder.sort((periode1, periode2) => {
        return periode1.tom.getTime() - periode2.tom.getTime();
    })[0];
};

const tidligsteFom = (perioder) => {
    return perioder.sort((periode1, periode2) => {
        return periode2.fom.getTime() - periode1.fom.getTime();
    })[0];
};

const antallDagerMellom = (dato1, dato2) => {
    return Math.round((dato1 - dato2) / (1000 * 60 * 60 * 24));
};

export const finnNyesteSykeforloepHosBedrift = (sykmeldinger, virksomhetsnummer) => {
    return sykmeldinger
        .filter((sykmelding) => {
            return sykmelding.orgnummer === virksomhetsnummer;
        })
        .sort((sykmelding1, sykmelding2) => {
            return senesteTom(sykmelding1.mulighetForArbeid.perioder).tom.getTime() - senesteTom(sykmelding2.mulighetForArbeid.perioder).tom.getTime();
        })
        .map((sykmelding) => {
            return {
                senesteTom: {
                    dato: senesteTom(sykmelding.mulighetForArbeid.perioder).tom,
                    grad: senesteTom(sykmelding.mulighetForArbeid.perioder).grad,
                },
                tidligsteFom: {
                    dato: tidligsteFom(sykmelding.mulighetForArbeid.perioder).fom,
                    grad: tidligsteFom(sykmelding.mulighetForArbeid.perioder).grad,
                    identdato: sykmelding.identdato,
                },
            };
        })
        .reverse()
        .reduce((acc, periode) => {
            return {
                senesteTom: acc.senesteTom,
                tidligsteFom: antallDagerMellom(acc.tidligsteFom.dato, periode.senesteTom.dato) <= 16 ? periode.tidligsteFom : acc.tidligsteFom,
            };
        });
};
