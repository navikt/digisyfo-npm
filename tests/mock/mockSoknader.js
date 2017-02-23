export const getSoknad = (soknad = {}) => {
  return Object.assign({}, {
    "id": "66a8ec20-b813-4b03-916f-7a2f0751b600",
    "status": "NY",
    "innsendtDato": null,
    "opprettetDato": "2017-01-18",
    "arbeidsgiver": {
      "navn": "***REMOVED***",
      "orgnummer": "***REMOVED***",
      "naermesteLeder": null
    },
    "identdato": "2016-07-15",
    "ansvarBekreftet": false,
    "bekreftetKorrektInformasjon": false,
    "arbeidsgiverUtbetalerLoenn": false,
    "egenmeldingsperioder": [],
    "gjenopptattArbeidFulltUtDato": null,
    "ferie": [],
    "permisjon": [],
    "utenlandsopphold": {
      "perioder": [],
      "soektOmSykepengerIPerioden": null,
    },
    "aktiviteter": [{
      "periode": {
        "fom": "2017-01-01",
        "tom": "2017-01-15"
      },
      "grad": 100,
      "avvik": null
    }, {
      "periode": {
        "fom": "2017-01-01",
        "tom": "2017-01-25"
      },
      "grad": 50,
      "avvik": null
    }],
    "andreInntektskilder": [],
    "utdanning": null
  }, soknad);
};

export default getSoknad;