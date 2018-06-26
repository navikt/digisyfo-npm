import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getHtmlLedetekst } from '../ledetekster';

const Hjelpeboble = (
    {
        bilde,
        bildeAlt,
        children,
        className = '',
        hvit = false,
        stor = false,
        vertikal = false,
    }) => {
    const classNames = cn(`hjelpeboble ${className}`, {
        'hjelpeboble--horisontal': !vertikal,
    });
    const bobleClassNames = cn({
        hjelpeboble__boble: true,
        'hjelpeboble__boble--hvit': hvit,
        'hjelpeboble__boble--stor': stor,
        'hjelpeboble__boble--horisontal': !vertikal,
    });
    const bildeClassNames = cn({
        hjelpeboble__bilde: true,
        'hjelpeboble__bilde--hvit': hvit,
        'hjelpeboble__bilde--stor': stor,
        'hjelpeboble__bilde--horisontal': !vertikal,
    });
    return (<div className={classNames}>
        <div className={bobleClassNames}>
            {children}
        </div>
        <div className={bildeClassNames}>
            <img src={bilde} alt={bildeAlt} />
        </div>
    </div>);
};

Hjelpeboble.propTypes = {
    bilde: PropTypes.string,
    bildeAlt: PropTypes.string,
    children: PropTypes.element,
    hvit: PropTypes.bool,
    stor: PropTypes.bool,
    vertikal: PropTypes.bool,
    className: PropTypes.string,
};

export const Bjorn = (
    {
        nokkel,
        children,
        hvit,
        stor,
        vertikal,
        className = '',
        rootUrl = '',
    }) => {
    return (<Hjelpeboble
        hvit={hvit}
        stor={stor}
        vertikal={vertikal}
        className={className}
        bilde={`${rootUrl}/img/svg/nav-ansatt--mannlig.svg`}
        bildeAlt="NAV-ansatt">
        {
            nokkel
                ? <div dangerouslySetInnerHTML={getHtmlLedetekst(nokkel)} />
                : children
        }
    </Hjelpeboble>);
};

Bjorn.propTypes = {
    nokkel: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    hvit: PropTypes.bool,
    stor: PropTypes.bool,
    vertikal: PropTypes.bool,
    className: PropTypes.string,
    rootUrl: PropTypes.string,
};

export default Hjelpeboble;
