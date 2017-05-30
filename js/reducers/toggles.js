import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    data: {},
    henter: false,
    hentingFeilet: false,
};

export default function toggles(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.HENTET_TOGGLES: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.HENTER_TOGGLES: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENT_TOGGLES_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
}
