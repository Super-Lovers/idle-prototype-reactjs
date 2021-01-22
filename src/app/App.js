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
		'lines_of_code': 100,
	};

	render() { 
		return (
			<div className='app ui vertically divided grid container'>
				<Programmer
					lines_of_code={this.state.lines_of_code}
					handleClickIncrementCode={this.clickIncrementCode}
				/>
				<Milestones />
				<Upgrades
					data={this.state}
				/>
			</div>
		);
	};

	// Triggered on tap/click
	clickIncrementCode = () => {
		this.incrementLinesOfCode(1);
	}

	// Triggered automatically periodically or through a tap/click
	incrementLinesOfCode = (increment) => {
		this.setState((previousState, props) => ({
			lines_of_code: previousState.lines_of_code + increment
		}));
	}
}

export default App;
