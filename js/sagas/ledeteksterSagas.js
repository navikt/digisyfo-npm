import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from '../utils';
import * as actions from '../actions/ledetekster_actions';
import { setLedetekster } from '../ledetekster';

export function* hentLedetekster() {
    yield put(actions.henterLedetekster());
    try {
        const ledetekster = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/tekster`);
        setLedetekster(ledetekster);
        yield put(actions.ledeteksterHentet(ledetekster));
    } catch (e) {
        log(e);
        yield put(actions.hentLedeteksterFeilet());
    }
}

function* watchHentLedetekster() {
    yield* takeEvery('HENT_LEDETEKSTER_FORESPURT', hentLedetekster);
}

export default function* ledeteksterSagas() {
    yield fork(watchHentLedetekster);
}
