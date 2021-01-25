// Dependancies
import React from 'react';
import { useContext } from 'react';
import { CodeContext } from '../contexts/code_context';

// Source code
import './Programmer.css';

const Programmer = (props) => {
	const {
		total_lines_of_code,
		lines_of_code,
		lines_of_code_per_second,
		incrementLinesOfCodeOnClick,
	} = useContext(CodeContext);

	const handleClick = () => {
		incrementLinesOfCodeOnClick();
	};

	return (
		<div className='programmer seven wide column ui vertically divided grid'>
			<h2>Programmer</h2>
			<div className='ui row one column'>
				<div className='ui column centered lines_of_code'>
					<span className='lines_of_code_number'>
						<br/>
						<p className='total_lines_of_code_label'>{total_lines_of_code}<br/> total lines written ..</p>
						{lines_of_code}
						<p className='total_lines_added'> +({(lines_of_code_per_second * 3).toFixed(2)} LoC/s)</p>
						new lines of code ..
					</span>
				</div>
				<div className='ui column'>
					<img 
						className='ui centered rounded image programmer'
						src='bango_programmer.gif'
						alt='programmer cat'
						onClick={handleClick}	
					/>
				</div>
			</div>
		</div>
	);
}

export default Programmer;