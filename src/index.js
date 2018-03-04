import React from 'react';
import ReactDOM from 'react-dom';
import './components/styles.css'
import Routes from './router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
