import { expect } from 'chai';
import { parseSykmelding, parseSykepengesoknad } from '../../js/utils/reducerUtils';
import { getSykmelding, getParsetSykmelding } from '../mock/mockSykmeldinger';
import { getSoknad, getParsetSoknad } from '../mock/mockSoknader';


describe("reducerUtils", () => {

    describe("parseSykmelding", () => {
        it("Skal parse felter", () => {
            expect(parseSykmelding(getSykmelding())).to.deep.equal(getParsetSykmelding());
        });
    });

    describe("parseSykepengesoknad", () => {
        it("Skal parse felter", () => {
            expect(parseSykepengesoknad(getSoknad())).to.deep.equal(getParsetSoknad());
        });
    })

});