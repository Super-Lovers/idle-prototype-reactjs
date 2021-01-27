import './notification.css';

const Notification = (
	{ closeToast, title, description, icon, lines_of_code, role }) => {
	
	const color = role === 'success' ? 'green' : 'red';
	const button_text = role === 'success' ? 'Sweet!' : 'Close'

	return <div className='notification'>
		<div className='content'>
			<div className='icon'>{icon}</div>
			<div className='header'>
				<div className='title'>{title}</div>
				<div className='meta'>{lines_of_code}</div>
			</div>
			<div className='description'>
				{description}
			</div>
			<div className='extra content'>
				<div className='ui buttons'>
					<div
						className={`ui inverted ${color} button`}
						onClick={closeToast}>
						{button_text}
					</div>
				</div>
			</div>
		</div>
	</div>
};

export default Notification;