// Dependancies
import React from 'react';

// Source code
import './Programmer.css';

class Programmer extends React.Component {
	render() {
		return (
			<div className='programmer row ui vertically divided grid'>
				<h2>Programmer</h2>
				<div className='ui row one column'>
					<div className='ui column centered lines_of_code'>
						<span className='lines_of_code_number'>
						<br/>
							{/*TODO: Add total lines of code being added from the upgrades */}
							{this.props.lines_of_code}
							<p className='total_lines_added'> +({this.props.lines_of_code_per_second.toFixed(2)} LoC/s)</p>
						</span>
						<p className='lines_of_code_label'> lines of code written..</p>
					</div>
					<div className='ui column'>
						<img 
							className='ui centered rounded image programmer'
							src='bango_programmer.gif'
							alt='programmer cat'
							onClick={this.handleClick}	
						/>
					</div>
				</div>
			</div>
		);
	};

	handleClick = () => {
		this.props.handleClickIncrementCode(1);
	};
}

export default Programmer;