import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'
import Routes from './router'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
