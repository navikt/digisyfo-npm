import { expect } from 'chai';
import { toDatePrettyPrint, getDuration, getPeriodeSpenn, getSykmeldingStartdato } from '../../js/utils/datoUtils';

describe("datoUtils", () => {

    describe("toDatePrettyPrint", () => {
        it("Skal formatere dato", () => {
            expect(toDatePrettyPrint({ year: 2014, monthValue: 2, dayOfMonth: 28 })).to.equal("28.02.2014");
        });

        it("Skal ta hensyn til tidssoner", () => {
            expect(toDatePrettyPrint({ year: 2016, monthValue: 5, dayOfMonth: 10 })).to.equal("10.05.2016");
        }); 

        it("Skal ta hensyn til skuddår", () => {
            expect(toDatePrettyPrint({ year: 1984, monthValue: 2, dayOfMonth: 29 })).to.equal("29.02.1984");
        });

        it("Kan formattere dato på ISO-format",() => {
            expect(toDatePrettyPrint("2017-02-02")).to.equal("02.02.2017")
        })
    });

    describe("getDuration", () => {
        it("Skal regne ut varighet", () => {
            expect(getDuration({ year: 2014, monthValue: 2, dayOfMonth: 27 }, { year: 2014, monthValue: 3, dayOfMonth: 8 })).to.equal(10);
            expect(getDuration({ year: 2014, monthValue: 6, dayOfMonth: 30 }, { year: 2014, monthValue: 7, dayOfMonth: 5 })).to.equal(6);
        });

        it("Kan regne ut varighet på ISO-format",() => {
            expect(getDuration("2014-02-27", "2014-03-08")).to.equal(10);
            expect(getDuration("2014-06-30", "2014-07-05")).to.equal(6);
        })
    });
});