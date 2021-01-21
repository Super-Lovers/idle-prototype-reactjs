// Dependancies
import React from 'react';
import ReactDOM from 'react-dom';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

// Semantic-ui and CSS
import 'semantic-ui-css/semantic.min.css'
import './index.css';

// Source code
import App from './app/App';
import Programmer from './programmer/Programmer';

library.add(fab, faCheckSquare, faCoffee);
// Performance & optimization
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App>
			<Programmer />
		</App>
	</React.StrictMode>,
	document.getElementById('root')
);
	
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
