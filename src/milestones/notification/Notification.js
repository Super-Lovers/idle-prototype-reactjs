import './notification.css';

const Notification = ({ closeToast, title, description, icon, lines_of_code }) => (
	<div className='notification'>
		<div className='content'>
			<div className='icon'>{icon}</div>
			<div className='header'>
				<div className='title'>{title}</div>
				<div className='meta'>{lines_of_code} lines worth of code</div>
			</div>
			<div className='description'>
				{description}
			</div>
			<div className='extra content'>
				<div className='ui buttons'>
					<div
						className='ui inverted green button'
						onClick={closeToast}>
						Sweet!
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Notification;