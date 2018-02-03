import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RewriteApp from './RewriteApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RewriteApp />, document.getElementById('root'));
registerServiceWorker();
