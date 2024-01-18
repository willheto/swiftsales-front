import React from 'react';
import Container from '../Container/Container';

const MeetingBlock = ({ salesAppointment }: { salesAppointment: SalesAppointmentInterface }) => {
	return (
		<Container className="w-100">
			<div
				style={{
					position: 'relative',
					width: '100%',
					paddingTop: '56.25%',
				}}
			>
				<iframe
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
					}}
					width="100%"
					height="500px"
					src={salesAppointment?.meetingUrl}
				/>
			</div>
			{salesAppointment?.notes && (
				<div className="mt-4">
					<h3>Notes</h3>
					<div>{salesAppointment?.notes}</div>
				</div>
			)}
		</Container>
	);
};

export default MeetingBlock;
