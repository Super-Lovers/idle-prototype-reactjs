// Dependancies
import React from 'react';

// Source code
import './Programmer.css';

class Programmer extends React.Component {
	render() {
		return (
			<div className='programmer row ui vertically divided grid'>
				<h2>Programmer</h2>
				<div className='ui row'>
					<img className='ui centered rounded image programmer' src='bango_programmer.gif' alt='programmer cat' />
				</div>
			</div>
		);
	};
}

export default Programmer;