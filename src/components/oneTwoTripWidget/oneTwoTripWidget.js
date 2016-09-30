import React, {PropTypes} from 'react';

class OneTwoTripWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div/>);
    }
}

OneTwoTripWidget.propTypes = {
    value: PropTypes.number,
    delay: PropTypes.number,
    className: PropTypes.string
};

OneTwoTripWidget.defaultProps = {
    delay: 0.5,
    value: 0,
    className: ''
};

export default OneTwoTripWidget