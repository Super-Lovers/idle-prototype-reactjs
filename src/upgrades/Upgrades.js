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
}

function Upgrade(props) {
	return (
		<div className='column upgrade'>
			<button className="fluid ui basic button">
				<i className={`icon ${props.icon}`}></i>
				{props.title}
			</button>
			<div className="ui inverted divider"></div>
		</div>
	);
}

export default Upgrades;