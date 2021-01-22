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
							{this.props.lines_of_code}
						</span>
						<p className='lines_of_code_label'> lines of code</p>
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