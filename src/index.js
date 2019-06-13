import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'
import Routes from './router'
import registerServiceWorker from './registerServiceWorker';
import config from './config'
import * as firebase from 'firebase'

firebase.initializeApp(config);

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
