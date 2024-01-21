import React from 'react';
import Container from '../Container/Container';
import styled from 'styled-components';

const MeetingBlock = ({ salesAppointment }: { salesAppointment: SalesAppointmentInterface }) => {
	const salesAppointmentHasNotes = salesAppointment?.notes && salesAppointment?.notes.length > 0;
	const salesAppointmentHasMeetingUrl = salesAppointment?.meetingUrl && salesAppointment?.meetingUrl.length > 0;
	return (
		<Container className="w-100">
			{salesAppointmentHasMeetingUrl ? (
				<Meeting>
					<StyledIframe
						width="100%"
						height="500px"
						src={salesAppointment?.meetingUrl}
						allow="camera; microphone"
					/>
				</Meeting>
			) : (
				<div className="d-flex justify-content-center align-items-center my-5">
					<h2 className="text-danger">No meeting URL set</h2>
				</div>
			)}
			{salesAppointmentHasNotes && (
				<div className="mt-4">
					<h3>Notes</h3>
					<div>{salesAppointment?.notes}</div>
				</div>
			)}
		</Container>
	);
};

const Meeting = styled.div`
	position: relative;
	width: 100%;
	padding-top: 56.25%;
`;

const StyledIframe = styled.iframe`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export default MeetingBlock;
