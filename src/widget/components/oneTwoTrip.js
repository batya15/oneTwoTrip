import React, {PropTypes} from 'react';
import styles from './oneTwoTrip.css';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from '../lib/promiseMiddleware';
import * as reducers from '../reducers';
import Main from './main/main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, window.devToolsExtension ? window.devToolsExtension() : f => f);


class OneTwoTripWidget extends React.Component {
    render() {
        return (
            <div className={styles.root} {...this.props}>
                <Provider store={store}>
                    <MuiThemeProvider muiTheme={getMuiTheme({userAgent: 'all'})}>
                        <Main/>
                    </MuiThemeProvider>
                </Provider>
            </div>
        );
    }
}

export default OneTwoTripWidget