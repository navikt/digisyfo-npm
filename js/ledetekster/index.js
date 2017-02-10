function replace(str, replacements) {
    return str.replace(/%\w+%/g, (all) => {
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
    let label = labels[key];
    if (Object.keys(labels).length === 0) {
        label = '';
    }
    if (!label) {
        label = `${key} [MANGLER LEDETEKST]`;
    }
    if (replacements) {
        label = replace(label, replacements);
    }
    return { __html: label };
}

export function getLedetekst(key, labels = {}, replacements) {
    if (localStorage.getItem('visLedetekster')) {
        return key;
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
