import { expect } from 'chai';
import { hentToggles } from '../../js/sagas/togglesSagas';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe('togglesSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest',
        };
    });

    const generator = hentToggles();

    it('Skal dispatche HENTER_TOGGLES', () => {
        const nextPut = put({ type: 'HENTER_TOGGLES' });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente toggles', () => {
        const nextCall = call(get, 'http://tjenester.nav.no/syforest/informasjon/toggles');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette toggles', () => {
        const nextPut = put({
            type: 'HENTET_TOGGLES',
            data: { 'min.toggle': 'true' },
        });
        expect(generator.next({ 'min.toggle': 'true' }).value).to.deep.equal(nextPut);
    });
});
