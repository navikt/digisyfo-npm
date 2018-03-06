import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../js/api/index';
import * as actiontyper from '../../js/actions/actiontyper';
import { hentSykeforloepsPerioderSaga } from '../../js/sagas/sykeforloepsPerioderSagas';

describe('sykeforloepsPerioderSagas', () => {

    describe('hentSykeforloepsPerioder', () => {
        const generator = hentSykeforloepsPerioderSaga({
            fnr: '123',
            virksomhetsnummer: '456',
        });

        it('Skal dispatche HENTER_SYKEFORLOEPSPERIODER', () => {
            const nextPut = put({
                fnr: '123',
                virksomhetsnummer: '456',
                type: actiontyper.HENTER_SYKEFORLOEPSPERIODER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/siste/perioder?fnr=123&orgnr=456`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette SYKEFORLOEPSPERIODER_HENTET', () => {
            const nextPut = put({
                type: actiontyper.SYKEFORLOEPSPERIODER_HENTET,
                periodeListe: undefined,
                fnr: '123',
                virksomhetsnummer: '456',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

    });

});