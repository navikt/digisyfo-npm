import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actiontyper from '../../js/actions/actiontyper';
import * as actions from '../../js/actions/sykeforloepsPerioder_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('sykeforloepsPerioder_actions', () => {

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            REST_ROOT: 'https://tjenester.nav.no/syforest/',
        };
    });

    it('Skal ha en hentSykeforloepsPerioder()-funksjon som returnerer riktig action', () => {
        expect(actions.hentSykeforloepsPerioder('fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.HENT_ARBEIDSFORHOLD_FORESPURT,
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });

    it('Skal ha en henterSykeforloepsPerioder()-funksjon som returnerer riktig action', () => {
        expect(actions.henterSykeforloepsPerioder('fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.HENTER_SYKEFORLOEPSPERIODER,
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });

    it('Skal ha en sykeforloepsPerioderHentet()-funksjon som returnerer riktig action', () => {
        expect(actions.sykeforloepsPerioderHentet([], 'fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.SYKEFORLOEPSPERIODER_HENTET,
            periodeListe: [],
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });

    it('Skal ha en hentSykeforloepsPerioderFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.hentSykeforloepsPerioderFeilet('fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.HENT_SYKEFORLOEPSPERIODER_FEILET,
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });
});
