// Dependancies
import React from 'react';
import { useState } from 'react';

// Source code
import './App.css';

// Modules
import Programmer from '../programmer/Programmer';
import Milestones from '../milestones/Milestones';
import Upgrades from '../upgrades/Upgrades';

const App = (props) => {
	const [lines_of_code, setLinesOfCode] = useState(100000);
	const [lines_of_code_per_second, setLinesOfCodePerSecond] = useState(0);

	const updateLinesOfCodePerSecond = (value) => {
		setLinesOfCodePerSecond(value);
	}

	// Triggered on tap/click
	const clickIncrementCode = (arg) => {
		incrementLinesOfCode(arg);
	}

	const clickDecrementCode = (arg) => {
		decrementLinesOfCode(arg);
	}

	// Functions triggered automatically periodically or through a tap/click
	// ==============================
	const incrementLinesOfCode = (increment) => {
		setLinesOfCode(lines_of_code + increment);
	}

	const decrementLinesOfCode = (increment) => {
		setLinesOfCode(lines_of_code - increment);
	}

	return (
	   <div className='app ui vertically divided grid container'>
		   <Programmer
			   lines_of_code={lines_of_code}
			   lines_of_code_per_second={lines_of_code_per_second}
			   handleClickIncrementCode={clickIncrementCode}
		   />
		   <Milestones 
			   lines_of_code={lines_of_code}
		   />
		   <Upgrades
			   lines_of_code={lines_of_code}
			   handleClickDecrementCode={clickDecrementCode}
			   handleUpdateLinesOfCodePerSecond={updateLinesOfCodePerSecond}
		   />
	   </div>
   );
};

export default App;
