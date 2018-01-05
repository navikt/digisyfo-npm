import { expect } from 'chai';
import { toDatePrettyPrint, getDuration, getPeriodeSpenn, getSykmeldingStartdato, toDate, fraInputdatoTilJSDato, erGyldigDatoformat, langtDatoFormat } from '../../js/utils/datoUtils';

describe('datoUtils', () => {

    describe('toDatePrettyPrint', () => {
        it('Skal formatere dato', () => {
            expect(toDatePrettyPrint({ year: 2014, monthValue: 2, dayOfMonth: 28 })).to.equal('28.02.2014');
        });

        it('Skal ta hensyn til tidssoner', () => {
            expect(toDatePrettyPrint({ year: 2016, monthValue: 5, dayOfMonth: 10 })).to.equal('10.05.2016');
        }); 

        it('Skal ta hensyn til skuddår', () => {
            expect(toDatePrettyPrint({ year: 1984, monthValue: 2, dayOfMonth: 29 })).to.equal('29.02.1984');
        });

        it('Kan formattere dato på ISO-format',() => {
            expect(toDatePrettyPrint('2017-02-02')).to.equal('02.02.2017')
        })

        it('Kan formattere dato på ISO-format når argument er JS-dato',() => {
            expect(toDatePrettyPrint(new Date('2017-02-02'))).to.equal('02.02.2017')
        })
    });

    describe('getDuration', () => {
        it('Skal regne ut varighet', () => {
            expect(getDuration({ year: 2014, monthValue: 2, dayOfMonth: 27 }, { year: 2014, monthValue: 3, dayOfMonth: 8 })).to.equal(10);
            expect(getDuration({ year: 2014, monthValue: 6, dayOfMonth: 30 }, { year: 2014, monthValue: 7, dayOfMonth: 5 })).to.equal(6);
        });

        it('Kan regne ut varighet på ISO-format',() => {
            expect(getDuration('2014-02-27', '2014-03-08')).to.equal(10);
            expect(getDuration('2014-06-30', '2014-07-05')).to.equal(6);
        })
    });

    describe('toDate', () => {
        it('Skal skal returnere JS-dato når sender inn en streng', () => {
            expect(toDate('2014-02-28')).to.deep.equal(new Date('2014-02-28'));
        });

        it('Skal skal returnere JS-dato når sender inn en JS-dato', () => {
            expect(toDate(new Date('2014-02-28'))).to.deep.equal(new Date('2014-02-28'));
        });

        it('Skal returnere null hvis vi sender inn null', () => {
            expect(toDate(null)).to.be.null;
        });
    });

    describe('fraInputdatoTilJSDato', () => {
        it('Skal håndtere dd.mm.åååå', () => {
            const dato = '12.02.2017';
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date('2017-02-12').getTime());
        });

        it('Skal håndtere dd.mm.åå', () => {
            const dato = '12.02.17';
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date('2017-02-12').getTime());
        });
    });

    describe('erGyldigDatoformat', () => {
        it('Skal returnere true ved 12.02.2017', () => {
            const d = erGyldigDatoformat('12.02.2017');
            expect(d).to.be.true;
        });

        it('Skal returnere false ved dd.mm.yy', () => {
            const d = erGyldigDatoformat('02.01.17');
            expect(d).to.be.false;
        })

        it('Skal returnere false ved aa.bb.cccc', () => {
            const d = erGyldigDatoformat('aa.bb.cccc');
            expect(d).to.be.false;
        });

        it('Skal returnere false ved 02.02.____', () => {
            const d = erGyldigDatoformat('02.02.____');
            expect(d).to.be.false;
        });

        it('Skal returnere false ved 02.0a.1234', () => {
            const d = erGyldigDatoformat('02.02.____');
            expect(d).to.be.false;
        });

        it('Skal returnere true ved 42.01.2020', () => {
            const d = erGyldigDatoformat('42.01.2020');
            expect(d).to.be.true;
        })
    });

    describe('langtDatoFormat', () => {
        it('Skal returnere 25. september 2017', () => {
            const d = langtDatoFormat(new Date(2017, 8, 25));
            expect(d).to.equal('25. september 2017');
        });
        it('Takler å få tekst-dato inn', () => {
            const d = langtDatoFormat('2017-09-25');
            expect(d).to.equal('25. september 2017');
        });
    });
});