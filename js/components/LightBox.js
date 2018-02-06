import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lightbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: true,
        };
    }

    componentDidMount() {
        this.lightbox.focus();
    }

    lukk() {
        const { onClose } = this.props;
        if (onClose) {
            onClose();
        }
        this.setState({
            erApen: false,
        });
    }

    render() {
        const { children, visLukkKryss } = this.props;
        if (!this.state.erApen) {
            return null;
        }
        return (<div className="lightbox" tabIndex="-1" ref={(c) => { this.lightbox = c; }}>
            <div className="lightbox__innhold">
                {
                    visLukkKryss && <button
                        onClick={() => {
                            this.lukk();
                        }}
                        className="lightbox__lukk js-lukk"
                        ref={(c) => {
                            this.lukknapp = c;
                        }}>Lukk</button>
                }
                {children}
            </div>
        </div>);
    }
}

Lightbox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onClose: PropTypes.func,
    visLukkKryss: PropTypes.bool,
};

export default Lightbox;
