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

export const erReplacements = (labels) => {
    if (!labels) {
        return false;
    }
    const keys = Object.keys(labels);
    return keys.reduce((acc, val) => {
        return acc && val === val.toUpperCase() && val.startsWith('%') && val.endsWith('%');
    }, true);
};

export const setLedetekster = (tekster) => {
    ledetekster = tekster || {};
};

export function getLedetekst(...args) {
    let labels;
    let replacements;
    const key = args[0];
    const _labels = args[1];
    const _replacements = args[2];

    if (localStorage.getItem('visLedetekster')) {
        return key;
    }

    switch (args.length) {
        case 1: {
            labels = ledetekster;
            break;
        }
        case 2: {
            if (!_labels) {
                labels = ledetekster;
            } else if (erReplacements(_labels)) {
                replacements = _labels;
                labels = ledetekster;
            } else {
                labels = _labels;
            }
            break;
        }
        default: {
            if (_labels) {
                labels = _labels;
            } else {
                labels = ledetekster;
            }
            replacements = _replacements;
            break;
        }
    }

    if (!labels || Object.keys(labels).length === 0) {
        return '';
    }
    const label = labels[key];
    if (!label) {
        return `${key} [MANGLER LEDETEKST]`;
    }
    if (!replacements) {
        return label;
    }
    return replace(label, replacements);
}

export function getHtmlLedetekst(...args) {
    const key = args[0];
    if (localStorage.getItem('visLedetekster')) {
        return { __html: key };
    }
    return {
        __html: getLedetekst.apply(this, args),
    };
}
