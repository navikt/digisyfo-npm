import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/sykeforloepsPerioder_actions';
import sykeforloepsPerioder from '../../js/reducers/sykeforloepsPerioder';

describe('sykeforloepsPerioder', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            henter: [],
            hentet: [],
            hentingFeilet: [],
            data: [],
        });

        it('håndterer HENTER_SYKEFORLOEPSPERIODER', () => {
            const action = actions.henterSykeforloepsPerioder('fnr', 'virksomhetsnummer');
            const nextState = sykeforloepsPerioder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: ['fnr', 'virksomhetsnummer'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it('håndterer SYKEFORLOEPSPERIODE_HENTET', () => {
            const state = deepFreeze({
                henter: ['fnr', 'virksomhetsnummer'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
            const action = actions.sykeforloepsPerioderHentet(
                {
                    fom: '1.1.2017',
                    tom: '2.1.2017',
                    grad: 100,
                    aktivitet: 'Test aktivitet',
                },
                'fnr',
                'virksomhetsnummer'
            );
            const nextState = sykeforloepsPerioder(state, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: ['fnr', 'virksomhetsnummer'],
                hentingFeilet: [],
                data: [{
                    periodeListe: {
                        fom: '1.1.2017',
                        tom: '2.1.2017',
                        grad: 100,
                        aktivitet: 'Test aktivitet',
                    },
                    fnr: 'fnr',
                    virksomhetsnummer: 'virksomhetsnummer',
                }],
            });
        });

        it('håndterer HENT_SYKEFORLOEPSPERIODE_FEILET', () => {
            const action = actions.hentKontaktinfoFeilet('fnr', 'virksomhetsnummer');
            const nextState = sykeforloepsPerioder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: ['fnr', 'virksomhetsnummer'],
                data: [],
            });
        });
    });
});
