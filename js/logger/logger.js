import Logger from 'nav-logger';
import { getCookie } from '../utils';

export default new Logger({
    url: `${window.APP_SETTINGS.REST_ROOT}/logging`,
    fetchConfig: (config) => {
        config.headers.set('NAV_CSRF_PROTECTION', getCookie('NAV_CSRF_PROTECTION'));
        return { ...config, credentials: 'include' };
    },
});
