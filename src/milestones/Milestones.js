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
				title={milestone.title}
				icon={milestone.icon}
				icon_alt={milestone.icon_alt}
				unlocked={milestone.unlocked}
				lines_of_code={milestone.lines_of_code}
				data={this.props.data}
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
	let icon_output;

	if (props.icon === '') {
		icon_output = <i className={`icon ${props.icon_alt}`}></i>;
	} else {
		icon_output = <i className='icon'>{props.icon}</i>;
	}

	if (props.lines_of_code <= props.data.lines_of_code) {
		return (
			<div className='column milestone piled segment'>
				<div className="fluid ui segment">
					{icon_output}
					<span> {props.title}</span>
				</div>
				<div className="ui inverted divider"></div>
			</div>
		);
	} else {
		return (
			<div className='column milestone piled segment'>
				<div className="fluid ui segment">
					<i className='icon question'></i>
					<i className='icon question gray'></i>
					<i className='icon question'></i>
				</div>
				<div className="ui inverted divider"></div>
			</div>
		);
	}
}

export default Milestones;