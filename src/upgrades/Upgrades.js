// Dependancies
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import upgrades_seed from './upgrades_seed copy';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Source code
import './Upgrades.css';
import { CodeContext } from '../contexts/code_context';

const Upgrades = (props) => {
	const [upgrades, setUpgrades] = useState(upgrades_seed.upgrades);

	const {
		lines_of_code,
		updateLinesOfCodePerSecond,
		fetchUpgrades,
		decrementLinesOfCode } = useContext(CodeContext);

	const unlockUpgrade = (upgrade) => {
		let index, counter = 0;
		let canPurchase = false;
		let total_lines_of_code_per_second = 0;

		const new_upgrades = upgrades.map((state_upgrade) => {
			counter++;

			if (state_upgrade.max_quantity <= upgrade.quantity) {
				if (state_upgrade.quantity > 0) {
					total_lines_of_code_per_second += parseFloat(state_upgrade.output_properties.current_increment);
				}
				
				return state_upgrade;
			}

			if (state_upgrade.title === upgrade.title &&
				state_upgrade.price_properties.current_price <= lines_of_code) {
				canPurchase = true;
				index = counter;

				state_upgrade.quantity++;

				// Updating price properties based on new tier (quantity)
				// ==============================
				const base_price = state_upgrade.price_properties.base_price;
				const cost_multiplier = state_upgrade.price_properties.multiplier;
				const quantity = state_upgrade.quantity;

				// First we take lines of code from the user
				// before updating the cost of the upgrade
				decrementLinesOfCode(state_upgrade.price_properties.current_price);

				state_upgrade.price_properties.current_price =
					Math.ceil(base_price * Math.pow(cost_multiplier, quantity));
				
				// Updating output properties based on new tier (quantity)
				// ==============================
				const output_base_multiplier = state_upgrade.output_properties.multiplier;
				const base_increment = state_upgrade.output_properties.base_increment;
				const base_output = state_upgrade.output_properties.base_output;
				let current_multiplier = state_upgrade.output_properties.current_multiplier;

				state_upgrade.output_properties.current_multiplier = current_multiplier =
					quantity * (base_increment * base_output);

				state_upgrade.output_properties.current_increment =
					(quantity * (output_base_multiplier * current_multiplier)).toFixed(2);

				if (quantity > 0) {
					total_lines_of_code_per_second += parseFloat(state_upgrade.output_properties.current_increment);
				}

				return Object.assign({}, state_upgrade, {
					unlocked: true
				});
			} else {
				if (state_upgrade.quantity > 0) {
					total_lines_of_code_per_second += parseFloat(state_upgrade.output_properties.current_increment);
				}
				
				return state_upgrade;
			}
		});

		// TODO: Make a pop-up to indicate why the purchase failed
		if (canPurchase === false) { return; }

		updateLinesOfCodePerSecond(total_lines_of_code_per_second);

		// TODO: Make a pop-up/achievement indicating a new upgrade has been unlocked
		// TODO: Make a pop-up to indicate the purchase was successful + the resulting lines of code
		if (index < new_upgrades.length &&
			(new_upgrades[index - 1].quantity === new_upgrades[index - 1].max_quantity ||
				new_upgrades[index - 1].quantity >= 3) &&
			new_upgrades[index].visible === false) {
				
				new_upgrades[index].visible = true;
		}

		setUpgrades(new_upgrades);
		fetchUpgrades(new_upgrades);
	};

	let index = 0;
	const new_upgrades = upgrades.map((upgrade) => (
		<Upgrade
			key={uuid()}
			icon={upgrade.icon}
			color={upgrade.color}
			price_properties={upgrade.price_properties}
			output_properties={upgrade.output_properties}
			title={upgrade.title}
			visible={upgrade.visible}
			unlockUpgrade={unlockUpgrade}
			quantity={upgrade.quantity}
			max_quantity={upgrade.max_quantity}
			index={++index}
		/>
	));

	return (
		<div className='upgrades row ui vertically grid'>
			<h2>Upgrades</h2>
			<div className='one column row'>
				{new_upgrades}
			</div>
		</div>
	);
}

const Upgrade = (props) => {
	const handleUnlockUpgrade = () => {
		props.unlockUpgrade(props);
	}

	const current_increment =
		props.quantity > 0 ? props.output_properties.current_increment : 0;

	if (props.visible && props.quantity < props.max_quantity) {
		return (
			<div className='column upgrade'>
				<div className='ui segment'>
					<p className='price'>
						<FontAwesomeIcon icon='code'/>
						<span> {props.price_properties.current_price}</span>
						<span> <b>(tier {props.quantity})</b></span>
					</p>
				</div>
				<button
					className={`fluid ui basic ${props.color} button`}
					onClick={handleUnlockUpgrade}
					>
					<i className='icon'>{props.icon}</i>
					{props.title}
					<span className='increment'> +({current_increment})</span>
				</button>
				<div className="ui inverted divider"></div>
			</div>
		);
	} else if (props.visible && props.quantity === props.max_quantity) {
		return (
			<div className='column upgrade'>
				<div className='ui segment inverted yellow'>
					<b><i className='icon exclamation'></i>Out of Stock</b>
				</div>
				<div className='ui segment'>
					<p className='price'>
						<FontAwesomeIcon icon='code'/>
						<span> {props.price_properties.current_price}</span>
						<span> <b>(tier {props.quantity})</b></span>
					</p>
				</div>
				<button
					className={`fluid ui basic ${props.color} button disabled`}
					// onClick={handleUnlockUpgrade}
					>
					<i className='icon'>{props.icon}</i>
					{props.title}
					<span className='increment'> +({current_increment})</span>
				</button>
				<div className="ui inverted divider"></div>
			</div>
		);
	} else {
		return (
			<div className='column upgrade'>
				<button disabled className="fluid ui black button">
					<i className='icon lock'></i>
					Locked
				</button>
				<div className="ui inverted divider"></div>
			</div>
		);
	}
}

export default Upgrades;