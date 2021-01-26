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
	const starting_lines_of_code = 50;
	const [total_lines_of_code, setTotalLinesOfCode] = useState(starting_lines_of_code);
	const [lines_of_code, setLinesOfCode] = useState(starting_lines_of_code);
	const [lines_of_code_per_second, setLinesOfCodePerSecond] = useState(0);
	const [upgrades, setUpgrades] = useState([]);

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
				role='success'
				title={milestone.title}
				description={milestone.description}
				icon={milestone.icon}
				icon_alt={milestone.icon_alt}
				lines_of_code={milestone.lines_of_code}
			/>, {
				position: 'top-center',
				autoClose: false,
				closeOnClick: true,
				delay: 0,
				closeButton: false,
				draggable: false,
			}
		);
	}
	
	const pushUpgradeNotification = (upgrade, type) => {
		const config = {
			role: type,
			position: 'top-center',
			autoClose: false,
			closeOnClick: true,
			delay: 0,
			closeButton: false,
			draggable: false,
		}

		let title, description, meta;
		switch (type) {
			case 'error':
				title = 'Insufficiet lines of code!';
				description = `You need to write more lines of code before you can afford "${upgrade.title}"!`;
				meta = `Short by ${parseFloat(upgrade.price_properties.current_price) - parseFloat(lines_of_code)} lines`;
				break;
			case 'success':
				title = `You bought ${upgrade.title}!`;
				description = `You now have ${upgrade.quantity + 1} of ${upgrade.title}`;
				meta = 'Good job, programmer';
				break;
			default:
				break;
		}

		toast(
			<Notification
				role={type}
				title={title}
				description={description}
				icon={upgrade.icon}
				lines_of_code={meta}
			/>, config
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
		setUpgrades(new_upgrades);
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
		<div>
			<div className='app ui grid container'>
				<CodeContext.Provider value={{
							total_lines_of_code,
							lines_of_code,
							lines_of_code_per_second,
							incrementLinesOfCodeOnClick,
							decrementLinesOfCode,
							updateLinesOfCodePerSecond,
							fetchUpgrades,
							pushMilestoneNotification,
							pushUpgradeNotification,
						}
					}>
						<Milestones />
						<Programmer />
						<Upgrades />
				</CodeContext.Provider>
			</div>
		<ToastContainer />
		</div>
	);
};

export default App;
