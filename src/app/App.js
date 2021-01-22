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
		'lines_of_code': 100000,
		'lines_of_code_per_second': 0
	};

	render() { 
		return (
			<div className='app ui vertically divided grid container'>
				<Programmer
					lines_of_code={this.state.lines_of_code}
					lines_of_code_per_second={this.state.lines_of_code_per_second}
					handleClickIncrementCode={this.clickIncrementCode}
				/>
				<Milestones />
				<Upgrades
					data={this.state}
					handleClickDecrementCode={this.clickDecrementCode}
					handleUpdateLinesOfCodePerSecond={this.updateLinesOfCodePerSecond}
				/>
			</div>
		);
	};

	updateLinesOfCodePerSecond = (value) => {
		this.setState({
			lines_of_code_per_second: value
		});
	}

	// Triggered on tap/click
	clickIncrementCode = (arg) => {
		this.incrementLinesOfCode(arg);
	}

	clickDecrementCode = (arg) => {
		this.decrementLinesOfCode(arg);
	}

	// Functions triggered automatically periodically or through a tap/click
	// ==============================
	incrementLinesOfCode = (increment) => {
		this.setState((previousState, props) => ({
			lines_of_code: previousState.lines_of_code + increment
		}));
	}

	decrementLinesOfCode = (increment) => {
		this.setState((previousState, props) => ({
			lines_of_code: previousState.lines_of_code - increment
		}));
	}
}

export default App;
