const erLocalDate = (dato) => { return dato.year && dato.monthValue && dato.dayOfMonth; };

export const toDate = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }
    return erLocalDate(dato) ? new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth) : new Date(dato);
};

export const toDatePrettyPrint = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }

    const _dato = toDate(dato);

    const days = _dato.getDate() < 10 ? `0${_dato.getDate()}` : `${_dato.getDate()}`;
    const months = _dato.getMonth() + 1 < 10 ? `0${_dato.getMonth() + 1}` : `${_dato.getMonth() + 1}`;
    const years = _dato.getFullYear();

    return `${days}.${months}.${years}`;
};

export function getDuration(from, to) {
    return Math.round(Math.floor(toDate(to) - toDate(from)) / (1000 * 60 * 60 * 24)) + 1;
}
