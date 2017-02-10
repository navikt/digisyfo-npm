import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
let temp = null;
const localS = {
    getItem: function(key) {
        return temp;
    },
    setItem: function(key, value) {
        temp = value;
    }
};

global.document = doc;
global.window = win;
global.localStorage = localS;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});