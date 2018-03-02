import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, log } from '../index';
import * as actions from '../actions/sykeforloepsPerioder_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentSykeforloepsPerioderSaga(action) {
    yield put(actions.henterSykeforloepsPerioder(action.fnr, action.virksomhetsnummer));
    try {
        const periodeListe = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/perioder/?fnr=${action.fnr}&orgnr=${action.virksomhetsnummer}`);
        yield put(actions.sykeforloepsPerioderHentet(periodeListe, action.fnr, action.virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepsPerioderFeilet(action.fnr, action.virksomhetsnummer));
    }
}

function* watchHentSykeforloepsPerioder() {
    yield* takeEvery(actiontyper.HENT_SYKEFORLOEPSPERIODER_FORESPURT, hentSykeforloepsPerioderSaga);
}

export default function* sykeforloepsPerioderSagas() {
    yield [
        fork(watchHentSykeforloepsPerioder),
    ];
}
