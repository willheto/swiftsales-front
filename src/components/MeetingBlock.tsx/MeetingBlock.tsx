import React from 'react';
import Container from '../Container/Container';
import styled from 'styled-components';

const MeetingBlock = ({ salesAppointment }: { salesAppointment: SalesAppointmentInterface }) => {
	const salesAppointmentHasMeetingUrl = salesAppointment?.meetingUrl && salesAppointment?.meetingUrl.length > 0;
	return (
		<Container
			className="w-100 position-relative"
			style={{
				maxHeight: '70%',
				height: '100%',
			}}
		>
			{salesAppointmentHasMeetingUrl ? (
				<Meeting>
					<StyledIframe src={salesAppointment?.meetingUrl} allow="camera; microphone" />
				</Meeting>
			) : (
				<div className="d-flex justify-content-center align-items-center my-5">
					<h2 className="text-danger">No meeting URL set</h2>
				</div>
			)}
		</Container>
	);
};

const Meeting = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const StyledIframe = styled.iframe`
	height: 100%;
	aspect-ratio: 16/9;
`;

export default MeetingBlock;
