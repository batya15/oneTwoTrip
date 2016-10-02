import * as React from 'react';
import * as ReactDom from 'react-dom';
import 'normalize.css';
import OneTwoTrip from 'widget/components/oneTwoTrip'

console.log('***Start Application***');

ReactDom.render(
    <div style={{padding: '20px'}}>
        <OneTwoTrip/>
    </div>,
    document.getElementById('application')
);
