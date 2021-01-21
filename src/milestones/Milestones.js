// Dependancies
import React from 'react';
import milestones_seed from './milestones_seed';
import uuid from 'react-uuid';

// Source code
import './Milestones.css';

class Milestones extends React.Component {
	state = milestones_seed;

	render() {
		const milestones = this.state.milestones.map((milestone) => (
			<Milestone
				key={uuid()}
				icon={milestone.icon}
				title={milestone.title}
			/>
		));

		return (
			<div className='milestones row ui vertically grid'>
				<h2>Milestones</h2>
				<div className='one column row'>
					{milestones}
				</div>
			</div>
		);
	};
}

function Milestone(props) {
	return (
		<div className='column milestone'>
			<button className="fluid ui basic button">
				<i className={`icon ${props.icon}`}></i>
				{props.title}
			</button>
			<div className="ui inverted divider"></div>
		</div>
	);
}

export default Milestones;