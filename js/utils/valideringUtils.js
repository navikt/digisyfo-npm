export const visFeilmelding = (skjemaData, field) => {
    if (field.indexOf('[') > -1) {
        // Håndtering av array ett nivå ned
        const _index = field.match(/\d+/)[0];
        const _field = field.split('[')[0];
        const _subfield = field.split('.')[1];
        return skjemaData.fields[_field][_index][_subfield].touched && typeof skjemaData.syncErrors[_field][_index][_subfield] === 'string';
    }
    if (!skjemaData || !skjemaData.fields || !skjemaData.fields[field] || !skjemaData.syncErrors || !skjemaData.syncErrors[field]) {
        return false;
    }
    for (const key in skjemaData.fields[field]) {
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
