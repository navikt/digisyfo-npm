const sykmelding = {
    id: 3456789,
    pasient: {
        fnr: "***REMOVED***",
        fornavn: "Per",
        etternavn: "Person",
    },
    arbeidsgiver: "Selskapet AS",
    orgnummer: "123456789",
    status: 'NY',
    identdato: { year: 2015, monthValue: 12, dayOfMonth: 31 },
    diagnose: {
        hoveddiagnose: {
            diagnose: "Influensa",
            diagnosesystem: "ICPC",
            diagnosekode: "LP2"
        },
    },
    mulighetForArbeid: {
        perioder: [{
            fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
            tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
            grad: 67
        }],
    },
    friskmelding: {
        arbeidsfoerEtterPerioden: true,
    },
    utdypendeOpplysninger: {},
    arbeidsevne: {},
    meldingTilNav: {},
    tilbakedatering: {},
    bekreftelse: {
        sykmelder: "***REMOVED***",
        utstedelsesdato: { year: 2016, monthValue: 5, dayOfMonth: 2 }
    },
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
};

export default getSykmelding;