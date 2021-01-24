// Dependancies
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import milestones_seed from './milestones_seed';
import uuid from 'react-uuid';

// Source code
import './Milestones.css';
import { CodeContext } from '../contexts/code_context';

const Milestones = (props) => {
	const [seed] = useState(milestones_seed);
	const [milestones, setMilestones] = useState(seed.milestones);

	const unlockMilestone = (milestone) => {
		const new_milestones = milestones.map((temp_milestone) => {
			if (milestone.title === temp_milestone.title &&
				temp_milestone.unlocked === false) {

				return Object.assign({}, milestone, {
					unlocked: true
				});
			} else {
				return temp_milestone;
			}
		});

		setMilestones(new_milestones);
	};

	const handleUnlockMilestone = (milestone) => {
		unlockMilestone(milestone);
	}

	const milestones_view = milestones.map((milestone) => (
		<Milestone
			key={uuid()}
			title={milestone.title}
			icon={milestone.icon}
			icon_alt={milestone.icon_alt}
			unlocked={milestone.unlocked}
			lines_of_code={milestone.lines_of_code}
			unlockMilestone={handleUnlockMilestone}
		/>
	));

	return (
		<div className='milestones five wide column ui vertically divided grid'>
			<h2>Milestones</h2>
			<div className='one column row'>
				{milestones_view}
			</div>
		</div>
	);
}

const Milestone = (props) => {
	const { total_lines_of_code } = useContext(CodeContext);

	let icon_output;

	if (props.icon === '') {
		icon_output = <i className={`icon ${props.icon_alt}`}></i>;
	} else {
		icon_output = <i className='icon'>{props.icon}</i>;
	}

	if (props.lines_of_code <= total_lines_of_code &&
		props.unlocked === false) {
		// props.unlockMilestone(props);

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