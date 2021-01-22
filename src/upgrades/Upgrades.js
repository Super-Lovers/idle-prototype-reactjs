// Dependancies
import React from 'react';
import upgrades from './upgrades_seed copy';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Source code
import './Upgrades.css';

class Upgrades extends React.Component {
	state = upgrades;

	render() {
		const upgrades = this.state.upgrades.map((upgrade) => (
			<Upgrade
				key={uuid()}
				icon={upgrade.icon}
				color={upgrade.color}
				price_properties={upgrade.price_properties}
				output_properties={upgrade.output_properties}
				title={upgrade.title}
				visible={upgrade.visible}
				unlockUpgrade={this.unlockUpgrade}
				quantity={upgrade.quantity}
			/>
		));

		return (
			<div className='upgrades row ui vertically grid'>
				<h2>Upgrades</h2>
				<div className='one column row'>
					{upgrades}
				</div>
			</div>
		);
	};

	unlockUpgrade = (upgrade) => {
		let index, counter = 0;
		let canPurchase = false;
		let total_lines_of_code_per_second = 0;

		const upgrades = this.state.upgrades.map((state_upgrade) => {
			counter++;

			if (state_upgrade.title === upgrade.props.title &&
				state_upgrade.price_properties.current_price <= this.props.data.lines_of_code) {
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
				this.handleDecrementCode(state_upgrade.price_properties.current_price);

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

		this.props.handleUpdateLinesOfCodePerSecond(total_lines_of_code_per_second);

		// TODO: Make a pop-up/achievement indicating a new upgrade has been unlocked
		// TODO: Make a pop-up to indicate the purchase was successful + the resulting lines of code
		if (index < upgrades.length &&
			upgrades[index - 1].quantity >= 3 &&
			upgrades[index].visible === false) {
				
			upgrades[index].visible = true;
		}

		this.setState({upgrades});
	};

	handleDecrementCode = (arg) => {
		this.props.handleClickDecrementCode(arg);
	}
}

class Upgrade extends React.Component {	
	render() {
		const current_increment =
			this.props.quantity > 0 ? this.props.output_properties.current_increment : 0;

		if (this.props.visible) {
			return (
				<div className='column upgrade'>
					<div className='ui segment'>
						<p className='price'>
							<FontAwesomeIcon icon='code'/>
							<span> {this.props.price_properties.current_price}</span>
							<span> <b>(tier {this.props.quantity})</b></span>
						</p>
					</div>
					<button
						className={`fluid ui inverted ${this.props.color} button`}
						onClick={this.handleUnlockUpgrade}
						>
						<i className='icon'>{this.props.icon}</i>
						{this.props.title}
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

	handleUnlockUpgrade = () => {
		this.props.unlockUpgrade(this);
	}
}

export default Upgrades;