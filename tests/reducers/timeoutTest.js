import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import timeout from '../../js/reducers/timeout';
import * as actions from '../../js/actions/timeout_actions';
import sinon from 'sinon';

describe('timeout', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers(1484523000000); // 16. januar 2017 00:30
    });

    it('Håndterer FORLENG_INNLOGGET_SESJON ', () => {
        const initialState = deepFreeze(timeout());
        const action = actions.forlengInnloggetSesjon();
        const nextState = timeout(initialState, action);
        expect(nextState).to.deep.equal({
            erInnloggetTil: new Date(2017, 0, 16, 1, 0, 0),
            brukerSnartUtlogget: false,
        });
    });

    it('Håndterer SNART_UTLOGGET ', () => {
        const initialState = deepFreeze(timeout());
        const action = actions.snartUtlogget();
        const nextState = timeout(initialState, action);
        expect(nextState).to.deep.equal({
            brukerSnartUtlogget: true,
        });
    });
});
