// Dependancies
import React from 'react';

// Source code
import './App.css';

// Modules
import Programmer from '../programmer/Programmer';
import Milestones from '../milestones/Milestones';
import Upgrades from '../upgrades/Upgrades';

class App extends React.Component {
	render() { 
		return (
			<div className='app ui vertically divided grid container'>
				<Programmer />
				<Milestones />
				<Upgrades />
			</div>
		);
	};
}

export default App;
