export const ANTALL_MS_DAG = 1000 * 60 * 60 * 24;

const erLocalDate = (dato) => { return dato.year && dato.monthValue && dato.dayOfMonth; };
const erDatostringUtenTid = (dato) => { return dato instanceof String && !dato.contains('T') && dato.split('-').length === 3; };

export const toDate = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }
    if (erLocalDate(dato)) {
        return new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth);
    } else if (erDatostringUtenTid(dato)) {
        const [year, month, day] = dato.split('-');
        return new Date(year, month, day, 0);
    }
    return new Date(dato);
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

export const fraInputdatoTilJSDato = (inputDato) => {
    const datoSplit = inputDato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    const s = `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
    return new Date(s);
};

export const erGyldigDatoformat = (dato) => {
    const d = dato.replace(/\./g, '');
    let s = `${parseInt(d, 10)}`;
    if (dato.startsWith('0')) {
        s = `0${s}`;
    }
    if (dato.trim().length !== 10) {
        return false;
    }
    if (s.length !== 8) {
        return false;
    }
    return true;
};

const maaneder = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
const SKILLETEGN_PERIODE = '–';

export const langtDatoFormat = (_dato) => {
    const dato = new Date(_dato);
    return `${dato.getDate()}. ${maaneder[dato.getMonth()]} ${dato.getFullYear()}`;
};

export const tilLesbarDatoUtenAarstall = (datoArg) => {
    if (datoArg) {
        const dato = new Date(datoArg);
        const dag = dato.getDate();
        const manedIndex = dato.getMonth();
        const maned = maaneder[manedIndex];
        return `${dag}. ${maned}`;
    }
    return null;
};

export const tilLesbarDatoMedArstall = (datoArg) => {
    return datoArg
        ? `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(datoArg).getFullYear()}`
        : null;
};

export const tilLesbarPeriodeMedArstall = (fomArg, tomArg) => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeAar = fom.getFullYear() === tom.getFullYear();
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeAar && erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
            ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
            : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarPeriodeUtenArstall = (fomArg, tomArg) => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`;
};
