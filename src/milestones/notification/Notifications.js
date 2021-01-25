import './notifications.css';
import { useState } from 'react';

const Notifications = () => {
	const [notification, setNotification] = useState({
		title: 'TODO app',
		description: "You've written enough code similar to that of a small TODO application, congrats!",
		icon: '📝',
		icon_alt: '',
		unlocked: false,
		lines_of_code: 500,
	});
	const [active, setActive] = useState(true);

	const closeNotification = () => {
		setActive(false);
	}

	const createNotification = (milestone) => {
		setNotification(milestone);
	}

	return (
		<div className={`ui cards notifications ${active ? 'active' : 'inactive'}`}>
			<Notification
				title={notification.title}
				description={notification.description}
				icon={notification.icon}
				icon_alt={notification.icon_alt}
				lines_of_code={notification.lines_of_code}
				closeNotification={closeNotification}
			/>
		</div>
	);
};

const Notification = (props) => {
	const handleCloseNotification = () => {
		props.closeNotification();
	}

	return (
		<div className='card notification'>
			<div className='notification_congrats'>
			🎉
			</div>
			<div className="content">
				<div className="right floated mini ui">{props.icon}</div>
				<div className="header">
					{props.title}
				</div>
				<div className="meta">
					{props.lines_of_code} lines worth of code
				</div>
				<div className="description">
					{props.description}
				</div>
				<div className="extra content">
					<div className="ui buttons">
						<div
							className="ui inverted green button"
							onClick={handleCloseNotification}>
							Sweet!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notifications;