import ponyfill from 'fetch-ponyfill';
import Ajax from 'simple-ajax';
import { getCookie, log } from '../utils';

const ponyfills = ponyfill();
const isEdge = () => {
    return window.navigator.userAgent.indexOf('Edge') > -1;
};

const getFetch = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom fetch overskrives
    if (isEdge()) {
        return ponyfills.fetch;
    }
    return window.fetch;
};

const getHeaders = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom Headers overskrives
    if (isEdge()) {
        return ponyfills.Headers;
    }
    return window.Headers;
};

let performOnHttpCalls = () => { return undefined; };
export const setPerformOnHttpCalls = (_performOnHttpCalls) => {
    performOnHttpCalls = _performOnHttpCalls;
};

export const get = (url) => {
    const fetchX = getFetch();
    performOnHttpCalls();

    return fetchX(url, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.status === 403) {
                log(res);
                throw new Error('403');
            }
            if (res.status === 404) {
                log(res);
                throw new Error('404');
            }
            if (res.status === 410) {
                log(res);
                throw new Error('410');
            }
            if (res.status > 400) {
                log(res);
                throw new Error(`Det har oppstått en ${res.status}-feil ved GET til '${url}'`);
            }
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
};

//  Hvis man har logget ut i en annen fane eller lignende kan man fange opp dette i testmiljøer at man får en 302 redirect
//  I prodlike miljøer vil man få en feilmelding som inneholder noe med preflight-is-invalid-redirect og idporten. Dette må nesten sjekkes en runde i Q0 (eneste miljø med ID-Porten)
const erBrukerUtlogget = (res) => {
    console.log('res', res);
    console.log('res.message', res.message);
    return res.redirected || (res.message && res.message.includes('idporten'));
};

export const post = (url, body) => {
    performOnHttpCalls();
    const fetchX = getFetch();
    const HeadersX = getHeaders();
    return fetchX(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new HeadersX({
            'Content-Type': 'application/json',
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        }),
    })
        .then((res) => {
            if (erBrukerUtlogget(res)) {
                window.location = '/esso/logout';
                return null;
            } else if (res.status === 409) {
                log(res);
                throw new Error('409');
            } else if (res.status > 400) {
                throw new Error(`Det har oppstått en ${res.status}-feil ved POST til '${url}'`);
            } else {
                const contentType = res.headers.get('Content-Type') || '';
                if (contentType.includes('json')) {
                    return res.json();
                }
                return res;
            }
        })
        .catch((err) => {
            log(err);
            throw err;
        });
};

export const getAjax = (url) => {
    const ajax = new Ajax(url);
    const promise = new Promise((resolve, reject) => {
        ajax.on('success', (respons, responsTekst) => {
            resolve(responsTekst);
        });
        ajax.on('error', reject);
    });
    ajax.send();
    return promise;
};
