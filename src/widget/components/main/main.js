import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styles from './main.css';
import classnames from 'classnames';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            carrier: "All"
        }
    }

    componentDidMount() {
        let request = Actions.didMountWidgetOneTwoTrip();
        this.props.dispatch(request);
        request.payload.then(() => {
            this.setState({loading: false});
            this.props.dispatch(Actions.selectedCarrier(this.state.carrier));
        });
    }

    selectedCarrier(event, index, value) {
        this.setState({carrier: value});
        this.props.dispatch(Actions.selectedCarrier(value));
    }

    render() {
        return (
            <div className={styles.main}>
                <Paper style={{height: '100%'}} zDepth={3}>
                    <div className={styles.wrapper}>
                        <div className={classnames({[styles.loading]: true, [styles.hide]: !this.state.loading})}>
                            <RefreshIndicator
                                size={40}
                                left={0}
                                top={0}
                                status="loading"
                            />
                        </div>
                    </div>
                    <If condition={!this.state.loading}>
                        <div className={styles.top}>
                            <SelectField value={this.state.carrier} onChange={::this.selectedCarrier}>
                                <MenuItem value="All" primaryText="All"/>
                                {this.props.carriers.map((item, index)=> <MenuItem value={item} key={index}
                                                                                   primaryText={item}/>)}
                            </SelectField>
                        </div>
                        <div className={styles.list}>
                            {this.props.flights
                                .filter(item => item.show)
                                .map(((item, index) => (
                                    <div key={index} className={styles.flight}>
                                        <Paper>
                                            <div className={styles.bg} style={{backgroundImage : `url(http://loremflickr.com/320/240/${item.to},flag)`}}>
                                                <div>{item.carrier}</div>
                                                <div>{item.from}</div>
                                                <div>{item.departure}</div>
                                                <div>{item.to}</div>
                                                <div>{item.arrival}</div>
                                            </div>
                                        </Paper>
                                    </div>
                                )))}
                        </div>
                    </If>
                </Paper>
            </div>
        );
    }
}

Main.propTypes = {
    dispatch: PropTypes.func,
    carriers: PropTypes.array,
    flights: PropTypes.array
};

export default connect(state => ({
    carriers: state.carriers,
    flights: state.flights
}))(Main)