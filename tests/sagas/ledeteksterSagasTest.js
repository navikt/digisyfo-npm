import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentLedetekster } from '../../js/sagas/ledeteksterSagas';
import { get } from '../../js/api';

describe('ledeteksterSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            SYFOTEKSTERREST_ROOT: 'http://tjenester.nav.no/syfotekster',
        };
    });

    const generator = hentLedetekster();

    it('Skal dispatche HENTER_LEDETEKSTER', () => {
        const nextPut = put({ type: 'HENTER_LEDETEKSTER' });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente ledetekster', () => {
        const nextCall = call(get, 'http://tjenester.nav.no/syfotekster/tekster');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette ledetekster', () => {
        const nextPut = put({
            type: 'LEDETEKSTER_HENTET',
            ledetekster: { 'min.ledetekst': 'Hello world!' },
        });
        expect(generator.next({ 'min.ledetekst': 'Hello world!' }).value).to.deep.equal(nextPut);
    });
});
