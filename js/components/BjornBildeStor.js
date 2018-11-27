import React, { Component } from 'react';
import PropTypes from 'prop-types';

const fargeApen = '#635E59';
const fargeLukket = '#E7E5E2';
const smilemunn = 'M15.48571,14.3678 C15.48571,14.3678 13.74911,18.34545 8.91741,18.19725 C4.08571,18.04905 2.27406,14.3678 2.27406,14.3678';
const alvorligmunn = 'M15.5,16.2c0,0-1.7,2.1-6.6,2c-4.8-0.1-6.6-2-6.6-2';

class BjornBildeStor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oyefarge: fargeApen,
            munnform: smilemunn,
            timeoutHandles: [],
        };
    }

    componentDidMount() {
        const handle1 = window.setTimeout(() => {
            this.blink();
        }, 3000);
        const handle2 = window.setTimeout(() => {
            this.bevegMunn();
        }, 5000);
        this.pushTimeoutHandle(handle1);
        this.pushTimeoutHandle(handle2);
    }

    componentWillUnmount() {
        this.clearTimeouts();
    }

    setOyeFarge(oyefarge) {
        this.setState({
            oyefarge,
        });
    }

    setMouthIndex(munnform) {
        this.setState({
            munnform,
        });
    }

    pushTimeoutHandle(handle) {
        this.setState({
            timeoutHandles: [...this.state.timeoutHandles, handle],
        });
    }

    clearTimeouts() {
        this.state.timeoutHandles.forEach((handle) => {
            window.clearTimeout(handle);
        });
    }

    lukkOyne() {
        this.setOyeFarge(fargeLukket);
    }

    openEyes() {
        this.setOyeFarge(fargeApen);
    }

    blink() {
        this.lukkOyne();
        const handle1 = window.setTimeout(() => {
            this.openEyes();
        }, 125);
        const handle2 = window.setTimeout(() => {
            this.blink();
        }, Math.random() * 10000);
        this.pushTimeoutHandle(handle1);
        this.pushTimeoutHandle(handle2);
    }

    smile() {
        this.setMouthIndex(smilemunn);
    }

    straightMouth() {
        this.setMouthIndex(alvorligmunn);
    }

    bevegMunn() {
        this.straightMouth();
        const handle1 = window.setTimeout(() => {
            this.smile();
        }, Math.random() * 10000);
        const handle2 = window.setTimeout(() => {
            this.bevegMunn();
        }, Math.random() * 30000);
        this.pushTimeoutHandle(handle1);
        this.pushTimeoutHandle(handle2);
    }

    render() {
        /* eslint-disable */
        return (<svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{this.props.alt}</title>
            <defs>
                <circle id="path-1" cx="50" cy="50" r="50" />
            </defs>
            <g id="Illustrasjoner" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Group-5">
                    <g id="Group-3">
                        <g id="Group-10-Copy-3">
                            <g id="Group-6">
                                <mask id="mask-2" fill="white">
                                    <use xlinkHref="#path-1" />
                                </mask>
                                <use id="Mask" fill="#A4DFF7" xlinkHref="#path-1" />
                                <g id="Group" mask="url(#mask-2)">
                                    <g transform="translate(25.000000, 15.500000)">
                                        <path
                                            d="M25.75,46.5 L17.975767,46.5 C13.7842838,46.5 0,55.1752289 0,63.2508842 L0,84.5 L51.5,84.5 L51.5,63.2508842 C51.5,55.1752289 37.7157162,46.5 33.524233,46.5 L25.75,46.5 Z"
                                            id="Fill-29-Copy"
                                            stroke="none"
                                            fill="#624B7F"
                                            fillRule="evenodd" />
                                        <path
                                            d="M46.8193831,21.114892 C46.604287,21.114892 46.4016188,21.1588606 46.2132903,21.2315045 C46.0976164,21.2448863 45.9886344,21.2515771 45.8739166,21.2640031 C44.1034373,10.3005162 35.8896372,2 26,2 C16.2461123,2 8.12504249,10.0768496 6.20734194,20.8166699 C6.14711506,20.9160772 6.0744604,21.0240872 6.02857325,21.114892 C6.02857325,21.114892 5.92341519,21.3280444 5.7876657,21.2315045 C5.59933719,21.1588606 5.39666893,21.114892 5.18252889,21.114892 C4.25235809,21.114892 3.5,21.8671382 3.5,22.7962149 L3.5,29.5826802 C3.5,30.5117568 4.25235809,31.2640031 5.18252889,31.2640031 C5.55440602,31.2640031 5.89377974,31.1378322 6.1719706,30.935194 C7.65565517,37.717836 11.6268057,43.3238387 16.8732367,46.390174 C15.4449992,46.9636781 13.0454835,48.2349455 13.0454835,48.2349455 C14.100888,49.7862741 17.1007605,57 25.9952201,57 C34.8887237,57 37.8972,49.7862741 38.9535605,48.2349455 C38.9535605,48.2349455 36.8886387,47.1013191 35.2271414,46.3318677 C40.4238613,43.2531065 44.3529487,37.6748232 45.8270734,30.935194 C46.1081322,31.1378322 46.44655,31.2640031 46.8193831,31.2640031 C47.7476419,31.2640031 48.5,30.5117568 48.5,29.5826802 L48.5,22.7962149 C48.5,21.8671382 47.7476419,21.114892 46.8193831,21.114892"
                                            id="Fill-44-Copy"
                                            stroke="none"
                                            fill="#E7E5E2"
                                            fillRule="evenodd" />
                                        <g id="Blid-mann-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(16.900000, 22.000000)">
                                            <path
                                                d="M1.52888,4.92157 C0.15423,5.02512 -0.23052,2.99877 0.18273,1.67542 C0.26158,1.42462 0.71663,0.28367 1.52223,0.28367 C2.32688,0.28367 2.68218,0.90687 2.73158,1.01422 C3.32343,2.30432 3.03273,4.80757 1.52888,4.92157"
                                                id="Fill-61"
                                                fill={this.state.oyefarge} />
                                            <path
                                                d="M16.87081,4.92157 C18.24546,5.02512 18.63021,2.99877 18.21601,1.67542 C18.13811,1.42462 17.68306,0.28367 16.87746,0.28367 C16.07281,0.28367 15.71751,0.90687 15.66811,1.01422 C15.07626,2.30432 15.36601,4.80757 16.87081,4.92157"
                                                id="Fill-63"
                                                fill={this.state.oyefarge} />
                                            <path
                                                d={this.state.munnform}
                                                id="Stroke-67"
                                                stroke="#D19E9C"
                                                strokeWidth="1.2"
                                                strokeLinecap="round" />
                                        </g>
                                        <path
                                            d="M7.55295431,27.5001716 L7.55295431,25.6941679 C7.41993664,20.6681161 9.21405307,18.3345158 10.6913063,16.5616203 C10.6913063,16.5616203 9.18160974,20.7642369 9.80668466,19.9610939 C13.3408453,15.4273944 30.2016466,19.851623 33.5984638,14 C34.0245529,17.2211161 31.6951215,16.5616203 31.6951215,16.5616203 C35.1124861,17.1906778 36.2382698,15.8246939 37.0407017,14.2376321 C37.3056556,15.5320594 37.6409034,15.2725331 36.4534773,16.1589808 C40.6527263,15.3857421 40.260162,14.2376321 40.260162,14.2376321 C40.8571193,17.9639165 44.4767141,15.9902353 44.4767141,22.0928405 L44.4767141,27.5001716 C44.4767141,27.7767861 44.7038174,28 44.9839116,28 L45.4857018,28 C45.765796,28 45.9939807,27.7767861 45.9939807,27.5001716 L45.9939807,23.4833886 C46.2535274,9.41236602 38.0918657,0 26.8578202,0 C16.1342165,0 6,9.38352977 6.00540722,21.806614 C6.00468626,21.8137341 6.00288385,23.7115866 6,27.5001716 C6,27.7767861 6.2260219,28 6.50611603,28 L7.04575684,28 C7.2004034,28 7.33450252,27.9273754 7.42534386,27.8205744 C7.52159242,27.6721211 7.55295431,27.5909524 7.55295431,27.5001716 Z"
                                            id="Fill-65-Copy"
                                            stroke="none"
                                            fill="#7F756C"
                                            fillRule="evenodd" />
                                        <path
                                            d="M26.4422146,29.0665618 C27.2738916,28.9354805 28.0844162,28.9670189 28.4651608,29.4460074 C29.3929855,30.6139116 29.1266566,31.9631612 27.5642575,32.9605612 C26.7835387,33.4582756 25.6778408,33.6622893 25,33.3547904"
                                            id="Stroke-65-Copy"
                                            stroke="#D1BFA3"
                                            strokeWidth="1.2"
                                            fill="none"
                                            strokeLinecap="round" />
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g id="Group-12-Copy" transform="translate(55.952381, 76.190476)">
                            <g id="NAV-Copy-2">
                                <g id="Group-11">
                                    <g id="Navansatt-mann">
                                        <g>
                                            <path
                                                d="M16.2446443,12.2476756 L1.52393173,12.2476756 C0.866977226,12.2476756 0.335073039,11.7247109 0.335073039,11.0787977 L0.335073039,3.29753437 C0.335073039,2.65162111 0.866977226,2.12779065 1.52393173,2.12779065 L16.2446443,2.12779065 C16.9015988,2.12779065 17.4343836,2.65162111 17.4343836,3.29753437 L17.4343836,11.0787977 C17.4343836,11.7247109 16.9015988,12.2476756 16.2446443,12.2476756"
                                                id="Fill-97"
                                                fill="#D2242A" />
                                            <path
                                                d="M12.7616406,7.36107337 C12.7616406,9.39751838 11.0831482,11.0503983 9.01189218,11.0503983 C6.9371136,11.0503983 5.25774061,9.39751838 5.25774061,7.36107337 C5.25774061,5.32462836 6.9371136,3.67174845 9.01189218,3.67174845 C11.0831482,3.67174845 12.7616406,5.32462836 12.7616406,7.36107337"
                                                id="Fill-98"
                                                fill="#FFFFFF" />
                                            <polygon
                                                id="Fill-99"
                                                fill="#FFFFFF"
                                                points="4.1509572 8.98728554 3.41914862 8.98728554 4.20115345 7.10236173 4.9347233 7.10236173" />
                                            <polygon
                                                id="Fill-100"
                                                fill="#FFFFFF"
                                                points="13.3739468 8.98728554 12.9204193 8.98728554 13.7024241 7.10236173 14.1559517 7.10236173" />
                                            <polygon
                                                id="Fill-101"
                                                fill="#FFFFFF"
                                                points="14.6256829 8.98728554 14.4337043 8.98728554 15.2139478 7.10236173 15.4059265 7.10236173" />
                                            <path
                                                d="M6.16162547,8.97819427 L6.73756146,8.97819427 C6.76750309,8.97819427 6.79039963,8.95568254 6.79039963,8.92710997 L6.79039963,7.16340313 C6.79039963,7.13483056 6.76750309,7.11231884 6.73756146,7.11231884 L6.15546102,7.11231884 C6.11671303,7.11231884 6.08853268,7.14175725 6.08853268,7.17898817 L5.8595673,7.7339887 C5.84547713,7.76256127 5.86837366,7.79719469 5.89919593,7.79719469 L6.06387487,7.79719469 C6.08853268,7.79719469 6.10966795,7.81537724 6.10966795,7.84221814 L6.10966795,8.92710997 C6.10966795,8.95568254 6.13256448,8.97819427 6.16162547,8.97819427"
                                                id="Fill-102"
                                                fill="#C52D35" />
                                            <path
                                                d="M7.41292127,8.97819427 L7.99061853,8.97819427 C8.02056016,8.97819427 8.0460986,8.95568254 8.0460986,8.92710997 L8.0460986,7.16340313 C8.0460986,7.13483056 8.02056016,7.11231884 7.99061853,7.11231884 L7.09236974,7.11231884 C7.05450239,7.11231884 7.02456076,7.14175725 7.02456076,7.17898817 L6.79471475,7.7339887 L6.7154575,7.79719469 L7.17514953,7.79719469 C7.27730331,7.79719469 7.36096374,7.87685156 7.36096374,7.97902014 L7.36096374,8.92710997 C7.36096374,8.95568254 7.38386028,8.97819427 7.41292127,8.97819427"
                                                id="Fill-103"
                                                fill="#C52D35" />
                                            <path
                                                d="M9.99626718,7.11249201 L9.41856992,7.11249201 C9.38950893,7.11249201 9.36573175,7.13500373 9.36573175,7.1635763 L9.36573175,8.92728314 C9.36573175,8.95585571 9.38950893,8.97836743 9.41856992,8.97836743 L10.0024316,8.97836743 C10.0411796,8.97836743 10.06936,8.94892903 10.06936,8.9116981 L10.2983254,8.35669757 C10.3124155,8.32639333 10.2903996,8.29349158 10.2551742,8.29349158 L10.0957791,8.29349158 C10.06936,8.29349158 10.0508666,8.27271153 10.0508666,8.24933397 L10.0508666,7.1635763 C10.0508666,7.13500373 10.0244475,7.11249201 9.99626718,7.11249201"
                                                id="Fill-104"
                                                fill="#C52D35" />
                                            <path
                                                d="M7.62013494,8.97819427 L7.99968908,8.97819427 C8.0366758,8.97819427 8.06661742,8.94789003 8.06661742,8.91239077 L8.2955828,8.35565857 C8.30879234,8.32622016 8.28677644,8.29245258 8.25331227,8.29245258 L8.09303651,8.29245258 L7.62013494,8.97819427 Z"
                                                id="Fill-105"
                                                fill="#C52D35" />
                                            <path
                                                d="M11.5421357,7.11249201 L12.2290319,7.11249201 C12.262496,7.11249201 12.2862732,7.14366208 12.272183,7.17396633 L11.5447776,8.94979486 C11.5394938,8.96797741 11.5227617,8.97836743 11.5025071,8.97836743 L10.8807781,8.97836743 L11.4972233,7.14279625 C11.5042684,7.1246137 11.5227617,7.11249201 11.5421357,7.11249201"
                                                id="Fill-106"
                                                fill="#C52D35" />
                                            <path
                                                d="M10.6808737,7.11249201 L9.70953208,7.11249201 C9.64084246,7.11249201 9.98869371,7.1782955 10.0133515,7.23976982 L10.7002477,8.91949062 C10.7143378,8.95672155 10.7495633,8.97836743 10.7883113,8.97836743 L11.3774568,8.97836743 L10.7715792,7.175698 C10.7583696,7.13586957 10.7213829,7.11249201 10.6808737,7.11249201"
                                                id="Fill-107"
                                                fill="#C52D35" />
                                            <path
                                                d="M9.41258159,7.71078431 C9.41258159,8.08655691 9.36414661,8.10906863 9.36414661,8.10906863 C9.36414661,8.10906863 9.30954717,7.74888107 9.02686299,7.74888107 C8.74946263,7.74888107 8.68605684,7.9081948 8.68605684,8.02681426 C8.68605684,8.1644821 8.82783924,8.29349158 8.90709649,8.29349158 L9.41258159,8.29349158 L9.11404597,8.94373402 C9.10347833,8.9653799 9.08234307,8.97836743 9.05856589,8.97836743 L8.82871988,8.97836743 C8.58830623,8.97836743 7.96041271,8.66839834 7.96041271,8.06837436 C7.96041271,7.46748455 8.42714983,7.11249201 8.81639097,7.11249201 C9.13782314,7.11249201 9.41258159,7.32981671 9.41258159,7.71078431 Z"
                                                id="Fill-108"
                                                fill="#C52D35" />
                                            <path
                                                d="M9.85228318,3.18237825 L8.25921253,3.18237825 C8.1412073,3.18237825 8.0460986,3.08886802 8.0460986,2.97284607 L8.0460986,2.70876625 C8.0460986,2.59361013 8.1412073,2.49923407 8.25921253,2.49923407 L9.85228318,2.49923407 C9.97028842,2.49923407 10.0653971,2.59361013 10.0653971,2.70876625 L10.0653971,2.97284607 C10.0653971,3.08886802 9.97028842,3.18237825 9.85228318,3.18237825"
                                                id="Fill-109"
                                                fill="#5A1F57" />
                                            <polygon
                                                id="Fill-110"
                                                fill="#C2B5CF"
                                                points="8.59455875 2.90660965 9.51746535 2.90660965 9.51746535 0.191349638 8.59455875 0.191349638" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <path
                        d="M31.2297363,46.4204102 C31.8908691,47.9741211 32.8905258,50.5249956 33.0759277,51.0751953 C33.3431695,51.8682632 33.8702691,53.1479263 34.6572266,54.9141846 L35.6162109,56.3950195 L32.4919434,57.1245117 C32.7613686,56.021037 32.9289304,55.180054 32.9946289,54.6015625 C33.0254943,54.3297856 32.7304083,53.734534 32.4919434,52.5615234 C32.3255596,51.7430808 31.9047216,49.1813025 30.925293,46.5440674 C30.8879645,46.4435559 30.9491845,46.4467347 31.0297852,46.4204102 C31.1147983,46.3926445 31.1442397,46.2194868 31.2297363,46.4204102 Z"
                        id="Rectangle-3"
                        fill="#7F756C" />
                    <path
                        d="M65.7672215,46.4138184 C65.8668403,46.7326 66.1898791,47.5436758 66.7363377,48.8470459 C67.2827963,50.1504159 68.104533,52.0697682 69.2015477,54.6051025 L70.9327488,57.0725098 L67.5567723,56.7453613 C67.7965184,56.2234429 67.9163914,55.6515842 67.9163914,55.0297852 C67.9163914,54.5145001 67.3288116,52.4529411 66.3448582,48.8470459 C66.2612194,48.5405346 65.8941977,46.9593944 65.7672215,46.4138184 C65.7146371,46.1878802 65.7146371,46.1878802 65.7672215,46.4138184 Z"
                        id="Rectangle-3"
                        fill="#7F756C"
                        transform="translate(68.330266, 51.658437) scale(-1, 1) translate(-68.330266, -51.658437) " />
                    <polygon id="Rectangle-3" fill="#7F756C" points="49.28125 58.5 52.6569824 58.5 52.2855225 62.5 49.6942139 62.5" />
                </g>
            </g>
        </svg>);
        /* eslint-enable */
    }
}

BjornBildeStor.propTypes = {
    alt: PropTypes.string,
};

export default BjornBildeStor;
