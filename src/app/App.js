// Dependancies
import React from 'react';
import { useState } from 'react';
import useInterval from '../counter/UseInterval'
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Source code
import './App.css';

// Modules
import { CodeContext } from '../contexts/code_context';
import Programmer from '../programmer/Programmer';
import Milestones from '../milestones/Milestones';
import Upgrades from '../upgrades/Upgrades';
import Notification from '../milestones/notification/Notification';

const App = () => {
	// State
	const starting_lines_of_code = 499.9;
	const [total_lines_of_code, setTotalLinesOfCode] = useState(starting_lines_of_code);
	const [lines_of_code, setLinesOfCode] = useState(starting_lines_of_code);
	const [lines_of_code_per_second, setLinesOfCodePerSecond] = useState(0);
	const [upgrades, refreshUpgrades] = useState([]);

	// Audio
	const background_keyboard_sounds = new Audio('./audio/computer-keyboard.mp3');

	const playAudio = () => {
		background_keyboard_sounds.play();
		background_keyboard_sounds.loop = true;
		background_keyboard_sounds.volume = 0.2;
	}

	// Notifications
	const pushMilestoneNotification = (milestone) => {
		toast(
			<Notification
				title={milestone.title}
				description={milestone.description}
				icon={milestone.icon}
				icon_alt={milestone.icon_alt}
				lines_of_code={milestone.lines_of_code}
			/>, {
				autoClose: false,
				closeOnClick: true,
				delay: 0,
				closeButton: false,
				draggable: false,
			}
		);
	}

	// Functions triggered automatically periodically or through a tap/click
	// ==============================
	const incrementLinesOfCodeOnClick = () => {
		if (upgrades.length > 0) {
			incrementLinesOfCode(getTotalLinesOfCodeWritten() * 1.1);
		}
	}

	const incrementLinesOfCode = (increment) => {
		if (total_lines_of_code === starting_lines_of_code) {
			playAudio();
		}

		let new_current_code = parseFloat(
			(lines_of_code + parseFloat(increment)).toFixed(2)
		);

		let new_total_code = parseFloat(
			(total_lines_of_code + parseFloat(increment)).toFixed(2)
		);

		setLinesOfCode(new_current_code);
		setTotalLinesOfCode(new_total_code);
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
			incrementLinesOfCode(getTotalLinesOfCodeWritten());
		}
	}, 333);

	const getTotalLinesOfCodeWritten = () => {
		let total_lines_of_code_written = 0;
		for (let i = 0; i < upgrades.length; i++) {
			const upgrade = upgrades[i];
			if (upgrade.quantity > 0) {
				total_lines_of_code_written += parseFloat(upgrade.output_properties.current_increment);
			}
		}

		return total_lines_of_code_written;
	}

	return (
		<CodeContext.Provider value={{
					total_lines_of_code,
					lines_of_code,
					lines_of_code_per_second,
					incrementLinesOfCodeOnClick,
					decrementLinesOfCode,
					updateLinesOfCodePerSecond,
					fetchUpgrades,
					pushMilestoneNotification,
				}
			}>
			<div className='app ui grid container'>
				<Milestones />
				<Programmer />
				<Upgrades />
			</div>
			<ToastContainer />
		</CodeContext.Provider>
	);
};

export default App;
