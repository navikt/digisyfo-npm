import * as actiontyper from '../actions/actiontyper';

const STANDARD_TIMEOUT = 2;
const VIS_TIMEOUTBOKS_MINUTTER_FOER_UTLOGGING = 1;
export const MILLIES_MELLOM_VIS_BOKS_OG_TIMEOUT = VIS_TIMEOUTBOKS_MINUTTER_FOER_UTLOGGING * 60 * 1000;

const hentErInnloggetTil = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + STANDARD_TIMEOUT);
    return date;
};

const initiellState = {
    erInnloggetTil: hentErInnloggetTil(),
    brukerSnartUtlogget: false,
};

export default function timeout(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.FORLENG_INNLOGGET_SESJON: {
            return {
                erInnloggetTil: hentErInnloggetTil(),
                brukerSnartUtlogget: false,
            };
        }
        case actiontyper.SNART_UTLOGGET: {
            return {
                brukerSnartUtlogget: true,
            };
        }
        default: {
            return state;
        }
    }
}
