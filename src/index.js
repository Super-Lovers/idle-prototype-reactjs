// Dependancies
import React from 'react';
import ReactDOM from 'react-dom';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

// Semantic-ui and CSS
import 'semantic-ui-css/semantic.min.css'
import './index.css';

// Source code
import App from './app/App';

library.add(fab, faCode);
// Performance & optimization
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>,
	document.getElementById('root')
);
	
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
