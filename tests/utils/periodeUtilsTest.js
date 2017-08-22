import { expect } from 'chai';
import { tidligsteFom, senesteTom } from '../../js/utils/periodeUtils';

describe("tidligsteFom og senesteTom", () => {

    it("Regner ut tidligsteFom og senesteTom", () => {
        const perioder = [
            {
                fom: '2017-05-10',
                tom: '2017-05-15',
            }, {
                fom: '2017-05-01',
                tom: '2017-05-09',
            }, {
                fom: '2017-04-10',
                tom: '2017-04-30',
            }, {
                fom: '2017-05-16',
                tom: '2017-05-20',
            }, {
                fom: '2017-05-21',
                tom: '2017-05-22',
            }, {}
        ];

        const fom = tidligsteFom(perioder);
        const tom = senesteTom(perioder);

        expect(fom).to.equal('2017-04-10');
        expect(tom).to.equal('2017-05-22');
    });

    it("Regner ut tidligsteFom og senesteTom når de er dato-objekter", () => {
        const perioder = [
            {
                fom: new Date('2017-05-10'),
                tom: new Date('2017-05-15'),
            }, {
                fom: new Date('2017-05-01'),
                tom: new Date('2017-05-09'),
            }, {
                fom: new Date('2017-04-10'),
                tom: new Date('2017-04-30'),
            }, {
                fom: new Date('2017-05-16'),
                tom: new Date('2017-05-20'),
            }, {
                fom: new Date('2017-05-21'),
                tom: new Date('2017-05-22'),
            }, {}
        ];

        const fom = tidligsteFom(perioder);
        const tom = senesteTom(perioder);

        expect(fom).to.deep.equal(new Date('2017-04-10'));
        expect(tom).to.deep.equal(new Date('2017-05-22'));
    });

});