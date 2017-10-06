export const visFeilmelding = (skjemaData, field) => {
    if (!skjemaData || !skjemaData.fields) {
        return false;
    }
    if (field.indexOf('[') > -1) {
        // Håndtering av array ett nivå ned
        const _index = field.match(/\d+/)[0];
        const _field = field.split('[')[0];
        const _subfield = field.split('.')[1];
        if (!skjemaData.fields[_field]) {
            return false;
        }
        return skjemaData.fields[_field][_index][_subfield].touched && typeof skjemaData.syncErrors[_field][_index][_subfield] === 'string';
    }
    if (!skjemaData.fields[field] || !skjemaData.syncErrors || !skjemaData.syncErrors[field]) {
        return false;
    }
    const keys = Object.keys(skjemaData.fields[field]);
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (skjemaData.fields[field][key].touched === true) {
            return true;
        }
    }
    return skjemaData.fields[field].touched && typeof skjemaData.syncErrors[field] === 'string';
};

export const getFeilmelding = (skjemaData, field) => {
    if (field.indexOf('[') > -1) {
        // Håndtering av array ett nivå ned
        const _index = field.match(/\d+/)[0];
        const _field = field.split('[')[0];
        const _subfield = field.split('.')[1];
        return skjemaData && skjemaData.syncErrors && typeof skjemaData.syncErrors[_field][_index][_subfield] === 'string' ? skjemaData.syncErrors[_field][_index][_subfield] : '';
    }
    return skjemaData && skjemaData.syncErrors && typeof skjemaData.syncErrors[field] === 'string' ? skjemaData.syncErrors[field] : '';
};
