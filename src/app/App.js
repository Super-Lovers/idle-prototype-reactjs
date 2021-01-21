// Dependancies
import React from 'react';

// Source code
import './App.css';

// Modules
import Programmer from '../programmer/Programmer';
import Milestones from '../milestones/Milestones';
import Upgrades from '../upgrades/Upgrades';

class App extends React.Component {
	state = {
		'characters_of_code': 0,
		'lines_of_code': 2000,
	};

	render() { 
		return (
			<div className='app ui vertically divided grid container'>
				<Programmer />
				<Milestones />
				<Upgrades
					data={this.state}
				/>
			</div>
		);
	};
}

export default App;
