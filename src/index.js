import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import promiseMiddleware from 'lib/promiseMiddleware';
import reducers from 'reducers';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import immutifyState from 'lib/immutifyState';
import 'normalize.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import OneTwoTripWidget from 'components/oneTwoTripWidget';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

console.log('***Start Application***');

const reducer = combineReducers({...reducers, routing: routerReducer});
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState, window.devToolsExtension ? window.devToolsExtension() : f => f);

ReactDom.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <OneTwoTripWidget/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('application')
);
