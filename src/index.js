// Dependancies
import React from 'react';
import ReactDOM from 'react-dom';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

// Source code
import App from './app/App';

// Semantic-ui and CSS
import 'semantic-ui-css/semantic.min.css'
import './index.css';

library.add(fab, faCode);

ReactDOM.render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>,
	document.getElementById('root')
);