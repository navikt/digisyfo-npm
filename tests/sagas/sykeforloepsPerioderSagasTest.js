import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../js/api/index';
import * as actiontyper from '../../js/actions/actiontyper';
import { hentSykeforloepsPerioder } from '../../js/actions/sykeforloepsPerioder_actions';

describe('sykeforloepsPerioderSagas', () => {

    describe('hentSykeforloepsPerioder', () => {
        const generator = hentSykeforloepsPerioder({
            fnr: '***REMOVED***',
            virksomhetsnummer: '***REMOVED***',
        });

        it('Skal dispatche HENTER_SYKEFORLOEPSPERIODER', () => {
            const nextPut = put({
                type: actiontyper.HENTER_SYKEFORLOEPSPERIODER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/siste/perioder?fnr=***REMOVED***&orgnr=***REMOVED***`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette SYKEFORLOEPSPERIODER_HENTET', () => {
            const nextPut = put({
                type: actiontyper.SYKEFORLOEPSPERIODER_HENTET,
                periodeListe: [{
                    fom: '1.1.2017',
                    tom: '2.1.2017',
                    grad: 100,
                    aktivitet: 'aktivitet',
                }],
                fnr: '***REMOVED***',
                virksomhetsnummer: '***REMOVED***',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

});