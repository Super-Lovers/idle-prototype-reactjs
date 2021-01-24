// Dependancies
import React from 'react';
import { useState } from 'react';
import useInterval from '../counter/UseInterval'

// Source code
import './App.css';

// Modules
import { CodeContext } from '../contexts/code_context';
import Programmer from '../programmer/Programmer';
import Milestones from '../milestones/Milestones';
import Upgrades from '../upgrades/Upgrades';

const App = (props) => {
	const [lines_of_code, setLinesOfCode] = useState(0);
	const [lines_of_code_per_second, setLinesOfCodePerSecond] = useState(0);
	const [upgrades, refreshUpgrades] = useState([]);

	// Functions triggered automatically periodically or through a tap/click
	// ==============================
	const incrementLinesOfCode = (increment) => {
		setLinesOfCode(parseFloat(
			(lines_of_code + parseFloat(increment)).toFixed(2)
		));
	}

	const decrementLinesOfCode = (decrement) => {
		setLinesOfCode(parseFloat(
			(lines_of_code - parseFloat(decrement)).toFixed(2)
		));
	}

	const updateLinesOfCodePerSecond = (value) => {
		setLinesOfCodePerSecond(value);
	}

	const fetchUpgrades = (new_upgrades) => {
		refreshUpgrades(new_upgrades);
	}

	useInterval(() => {
		if (upgrades.length > 0) {
			let total_lines_of_code_written = 0;
			for (let i = 0; i < upgrades.length; i++) {
				const upgrade = upgrades[i];
				if (upgrade.quantity > 0) {
					total_lines_of_code_written += parseFloat(upgrade.output_properties.current_increment);
				}
			}
	
			incrementLinesOfCode(total_lines_of_code_written);
		}
	}, 300);

	return (
		<CodeContext.Provider value={{
					lines_of_code,
					lines_of_code_per_second,
					incrementLinesOfCode,
					decrementLinesOfCode,
					updateLinesOfCodePerSecond,
					fetchUpgrades,
				}
			}>
			<div className='app ui vertically divided grid container'>
				<Programmer/>
				<Milestones/>
				<Upgrades/>
			</div>
		</CodeContext.Provider>
	);
};

export default App;
