import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from '../index';
import * as actions from '../actions/sykeforlopsPerioder_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentSykeforlopsPerioderSaga(action) {
    yield put(actions.henterSykeforlopsPerioder(action.fnr, action.virksomhetsnummer));
    try {
        const periodeListe = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/siste/perioder?fnr=${action.fnr}&orgnr=${action.virksomhetsnummer}`);
        yield put(actions.sykeforlopsPerioderHentet(periodeListe, action.fnr, action.virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforlopsPerioderFeilet(action.fnr, action.virksomhetsnummer));
    }
}

function* watchHentSykeforlopsPerioder() {
    yield takeEvery(actiontyper.HENT_SYKEFORLOPSPERIODER_FORESPURT, hentSykeforlopsPerioderSaga);
}

export default function* sykeforlopsPerioderSagas() {
    yield fork(watchHentSykeforlopsPerioder);
}
