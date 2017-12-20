import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mock/mockLedetekster.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import UtdypendeOpplysninger from "../../../js/components/sykmeldingOpplysninger/UtdypendeOpplysninger.js";
import { getParsetSykmelding } from "../../mock/mockSykmeldinger.js";

let component;

describe("Utdypende opplysninger", () => {

    describe("Sykehistorie", () => {
        it("Skal vise sykehistorie dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    sykehistorie: "Min sykehistorie er ganske kort. Flaks for meg."
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-sykehistorie").text()).to.equal("Min sykehistorie er ganske kort. Flaks for meg.")
        });

        it("Skal ikke vise sykehistorie dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    sykehistorie: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-sykehistorie").length).to.equal(0)
        });
    });

    describe("Hvordan påvirker sykdommen arbeidsevnen?", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    paavirkningArbeidsevne: "I stor grad"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-paavirkningArbeidsevne").text()).to.equal("I stor grad")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    paavirkningArbeidsevne: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-paavirkningArbeidsevne").length).to.equal(0)
        });
    });

    describe("Har behandlingen frem til nå bedret arbeidsevnen?", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    resultatAvBehandling: "Gode resultater"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-resultatAvBehandling").text()).to.equal("Gode resultater")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    resultatAvBehandling: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-resultatAvBehandling").length).to.equal(0)
        });
    });

    describe("Beskriv pågående og planlagt henvisning, utredning og/eller behandling", () => {
        it("Skal vise dersom den finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: "Dette er min beskrivelse"
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-henvisningUtredningBehandling").text()).to.equal("Dette er min beskrivelse")
        });

        it("Skal ikke vise dersom den ikke finnes", () => {
            let component = shallow(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: null
                }
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-henvisningUtredningBehandling").length).to.equal(0)
        });
    });    

    describe("Utdypende opplysninger i liste", () => {
        it("Rendrer en opplysning", () => {
            let component = mount(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: 'opplysning',
                    grupper: [
                        {
                            id: '6.2',
                            sporsmal: [
                                {
                                    id: '6.2.1',
                                    svar: 'svar 6.2.1',
                                },
                                {
                                    id: '6.2.2',
                                    svar: 'svar 6.2.2',
                                }
                            ]
                        }]
                }
            })} ledetekster={ledetekster} />);

            expect(component.find(".sykmeldingSeksjon__tittel").length).to.equal(1);
            expect(component.find(".opplysning__tittel").length).to.equal(2);
            expect(component.find(".opplysning__verdi").length).to.equal(2);

        });

        it("Tegner ikke seksjonene ved tom liste", () => {
            let component = mount(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: null,
                    grupper: []
                }
            })} ledetekster={ledetekster} />);

            expect(component.find(".sykmeldingSeksjon__tittel").length).to.equal(0);
        })
    })

    it("Viser tittel på legacy visning", () => {
        let component = mount(<UtdypendeOpplysninger sykmelding={getParsetSykmelding({
            utdypendeOpplysninger: {
                henvisningUtredningBehandling: 'opplysning',
            }
        })} ledetekster={ledetekster} />);

        expect(component.find(".sykmeldingSeksjon__tittel").length).to.equal(1);
        expect(component.find(".opplysning__tittel").length).to.equal(1);
        expect(component.find(".opplysning__verdi").length).to.equal(1);
    })
}); 