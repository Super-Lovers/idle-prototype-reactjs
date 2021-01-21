// Dependancies
import React from 'react';
import upgrades from './upgrades_seed copy';
import uuid from 'react-uuid';

// Source code
import './Upgrades.css';

class Upgrades extends React.Component {
	state = upgrades;

	render() {
		const upgrades = this.state.upgrades.map((upgrade) => (
			<Upgrade
				key={uuid()}
				icon={upgrade.icon}
				title={upgrade.title}
				unlockUpgrade={this.unlockUpgrade}
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
		const upgrades = this.state.upgrades.map((state_upgrade) => {
			if (state_upgrade.title === upgrade.props.title &&
				state_upgrade.requirements.lines_of_code <= this.props.data.lines_of_code) {
				return Object.assign({}, state_upgrade, {
					unlocked: true
				});
			} else {
				return state_upgrade;
			}
		});

		this.setState({upgrades});
	};
}

class Upgrade extends React.Component {
	render() {
		return (
			<div className='column upgrade'>
				<button
					className="fluid ui basic button"
					onClick={this.handleUnlockUpgrade}
					>
					<i className={`icon ${this.props.icon}`}></i>
					{this.props.title}
				</button>
				<div className="ui inverted divider"></div>
			</div>
		);
	}

	handleUnlockUpgrade = () => {
		this.props.unlockUpgrade(this);
	}
}

export default Upgrades;