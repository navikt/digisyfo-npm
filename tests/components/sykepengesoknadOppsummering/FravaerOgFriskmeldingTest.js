import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import FravaerOgFriskmelding, { FeriePermisjonEllerUtenlandsopphold } from '../../../js/components/sykepengesoknadOppsummering/FravaerOgFriskmelding';
import { getParsetSoknad } from '../../mock/mockSoknader';
import ledetekster from '../../mock/mockLedetekster';

describe("Oppsummering - FravaerOgFriskmelding -", () => {

    let component;

    it("Skal vise egenmeldingsdager hvis det er krysset av for egenmeldingsdager", () => {
      const soknad = getParsetSoknad({
        egenmeldingsperioder: [{
            fom: new Date("2016-12-27"),
            tom: new Date("2016-12-31")
        }]
      });
      component = mount(<FravaerOgFriskmelding ledetekster={ledetekster} sykepengesoknad={soknad} />);
      const fragment = component.find(".js-egenmeldingsdager");
      expect(fragment.text()).to.contain("Brukte du egenmeldingsdager før det legemeldte fraværet startet den 15.07.2016?");
      expect(fragment.text()).to.contain("Ja");
      expect(fragment.text()).to.contain("Fra 27.12.2016");
      expect(fragment.text()).to.contain("Til 31.12.2016");
      expect(fragment.find(".js-perioder")).to.have.length(1);
    });

    it("Skal ikke vise egenmeldingsdager hvis det ikke er krysset av for egenmeldingsdager", () => {
      component = mount(<FravaerOgFriskmelding ledetekster={ledetekster} sykepengesoknad={getParsetSoknad({
        egenmeldingsperioder: []
      })} />)
      const fragment = component.find(".js-egenmeldingsdager");
      expect(fragment.text()).to.contain("Brukte du egenmeldingsdager før det legemeldte fraværet startet den 15.07.2016?");
      expect(fragment.text()).to.contain("Nei");
      expect(fragment.find(".js-perioder")).to.have.length(0);
    });

    it("Skal vise gjenopptatt arbeid fullt ut", () => {
      const soknad = getParsetSoknad({
        gjenopptattArbeidFulltUtDato: new Date("2017-01-15")
      });
      component = mount(<FravaerOgFriskmelding ledetekster={ledetekster} sykepengesoknad={soknad} />);
      const fragment = component.find(".js-gjenopptattArbeid");
      expect(fragment.text()).to.contain("Har du gjenopptatt arbeidet ditt hos ***REMOVED*** fullt ut?");
      expect(fragment.text()).to.contain("Ja");
      expect(fragment.text()).to.contain("Den 15.01.2017")    
    });

    it("Skal vise gjenopptatt arbeid fullt ut dersom det er krysset av for nei", () => {
      component = mount(<FravaerOgFriskmelding ledetekster={ledetekster} sykepengesoknad={getParsetSoknad({
        gjenopptattArbeidFulltUtDato: null,
      })} />);
      const fragment = component.find(".js-gjenopptattArbeid");
      expect(fragment.text()).to.contain("Har du gjenopptatt arbeidet ditt hos ***REMOVED*** fullt ut?");
      expect(fragment.text()).to.contain("Nei");
      expect(fragment.text()).not.to.contain("Den 15.01.2017")    
    });

    describe("Ferie, permisjon eller utenlandsopphold", () => {

      let getFragment;

      beforeEach(() => {
        getFragment = (soknad = {}) => {
          return mount(<FeriePermisjonEllerUtenlandsopphold ledetekster={ledetekster} sykepengesoknad={getParsetSoknad(soknad)} />);
        }
      });

      describe("Dersom man har fylt ut gjenopptattArbeidFulltUtDato", () => {

        it("Skal bruke denne datoen minus én dag i spørsmål om ferie, permisjon eller utenlandsopphold", () => {
          const fragment = getFragment({
            gjenopptattArbeidFulltUtDato: new Date("2017-01-20"),
          });
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 19.01.2017?");
        });

        it("Skal bruke denne datoen hvis datoen er den samme som tidligsteFom", () => {
          const fragment = getFragment({
            gjenopptattArbeidFulltUtDato: new Date("2017-01-01"),
          });
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 01.01.2017?");
        });

      });

      describe("Dersom søknaden har forrigeSykeforloepTom og/eller forrigeSendteSoknadTom", () => {

          it("Skal bruke tidligsteFom om vi ikke har en tidligere sendt soknad", () => {
            const fragment = getFragment({
              forrigeSykeforloepTom: new Date("2016-12-18"),
            });
            expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 18.12.2016 – 25.01.2017?");
          });

          it("Skal bruke soknadFOM når vi har en søknad for en periode nærmere enn forrige sykeforloep", () => {
              const fragment = getFragment({
                  forrigeSykeforloepTom: new Date("2016-12-18"),
                  forrigeSendteSoknadTom: new Date("2016-12-19"),
              });
              expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 25.01.2017?");
          });

          it("Skal bruke soknadFOM når vi har en søknad for en periode samme som forrige sykeforloep", () => {
              const fragment = getFragment({
                  forrigeSykeforloepTom: new Date("2016-12-18"),
                  forrigeSendteSoknadTom: new Date("2016-12-18"),
              });
              expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 25.01.2017?");
          });

          it("Skal bruke soknadFOM når vi har tidligere innsendt søknad og ingen tidligere sykeforloep", () => {
              const fragment = getFragment({
                  forrigeSendteSoknadTom: new Date("2016-12-19"),
              });
              expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 25.01.2017?");
          });

      });
      
      describe("Dersom svaret er nei pga tomme array", () => {
        let fragment; 

        beforeEach(() => {
          fragment = getFragment({
            ferie: [],
            permisjon: [],
            utenlandsopphold: null
          })
        });

        it("Skal vise ferie, permisjon eller utenlandsopphold", () => {
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 25.01.2017?");
          expect(fragment.text()).to.contain("Nei");
        });

      });

      describe("Dersom svaret er ja", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            ferie: [{
              fom: new Date("2017-01-02"),
              tom: new Date("2017-01-10")
            }]
          })
        })
        
        it("Skal vise ferie, permisjon eller utenlandsopphold", () => {
          expect(fragment.text()).to.contain("Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 25.01.2017?");
          expect(fragment.text()).to.contain("Ja");
        });

        it("Skal vise Jeg har ...", () => {
          expect(fragment.text()).to.contain("Jeg har ...")
        });

      });

      describe("Dersom svaret er ja og man har hatt ferie", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "harHattFeriePermisjonEllerUtenlandsopphold": true,
            "ferie": [{
              fom: new Date("2017-01-02"),
              tom: new Date("2017-01-10")
            }]
          });
        });

        it("Skal vise informasjon om ferien", () => {
          expect(fragment.text()).to.contain("tatt ut ferie");
          expect(fragment.text()).to.contain("Fra 02.01.2017");
          expect(fragment.text()).to.contain("Til 10.01.2017");
        });

      });

      describe("Dersom svaret er ja og man har hatt permisjon", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "permisjon": [{
              fom: new Date("2017-01-12"),
              tom: new Date("2017-01-15")
            }]
          });
        });

        it("Skal vise informasjon om permisjonen", () => {
          expect(fragment.text()).to.contain("hatt permisjon");
          expect(fragment.text()).to.contain("Fra 12.01.2017");
          expect(fragment.text()).to.contain("Til 15.01.2017");
        });

      });

      describe("Dersom svaret er ja og man har oppholdt seg utenfor Norge", () => {

        let fragment;

        beforeEach(() => {
          fragment = getFragment({
            "utenlandsopphold": {
              "perioder": [{
                fom: new Date("2017-01-12"),
                tom: new Date("2017-01-15")
              }],
              "soektOmSykepengerIPerioden": false,
            }
          });
        });

        it("Skal vise informasjon om utenlandsoppholdet", () => {
          expect(fragment.text()).to.contain("oppholdt meg utenfor Norge");
          expect(fragment.text()).to.contain("Fra 12.01.2017");
          expect(fragment.text()).to.contain("Til 15.01.2017");
        });

        it("Skal vise spørsmål om man har søkt om sykepenger", () => {
          const subfragment = fragment.find(".js-utenlandsoppholdSoktOmSykepenger");
          expect(subfragment.text()).to.contain("Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?");
          expect(subfragment.text()).to.contain("Nei");
        });

      });

    });

});