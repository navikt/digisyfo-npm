let ledetekster = {};

function replace(str, replacements) {
    return str.replace(/%\w+%+([.,:;?]{0}?)/g, (all) => {
        return `${replacements[all]}` || all;
    });
}

export function hasURLParameter(parameterName) {
    let result = false;
    let tmp = [];
    window.location.search
        .substr(1)
        .split('&')
        .forEach((item) => {
            tmp = item.split('=');
            if (tmp[0] === parameterName) {
                result = true;
            }
        });
    return result;
}

export function getHtmlLedetekst(key, labels, replacements) {
    if (localStorage.getItem('visLedetekster')) {
        return { __html: key };
    }
    return {
        __html: getLedetekst.apply(this, arguments),
    };
}

export const erReplacements = (labels) => {
    const keys = Object.keys(labels);
    return keys.reduce((acc, val) => {
        return val === val.toUpperCase();
    }, true)
}

export const setLedetekster = (tekster) => {
    ledetekster = tekster || {};
}

export function getLedetekst(key, _labels = {}, _replacements) {
    let labels;
    let replacements;
    
    if (localStorage.getItem('visLedetekster')) {
        return key;
    }

    switch (arguments.length) {
        case 1: {
            labels = ledetekster;
            break;
        }
        case 2: {
            if (erReplacements(_labels)) {
                replacements = _labels;
                labels = ledetekster;
            } else {
                labels = _labels;
            }
            break;
        }
        case 3: {
            labels = _labels;
            replacements = _replacements;
            break;
        }
    }

    const label = labels[key];
    if (Object.keys(labels).length === 0) {
        return '';
    }
    if (!label) {
        return `${key} [MANGLER LEDETEKST]`;
    }
    if (!replacements) {
        return label;
    }
    return replace(label, replacements);
}
