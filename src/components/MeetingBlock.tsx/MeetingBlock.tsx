import Container from '../Container/Container';
import styled from 'styled-components';

const MeetingBlock = ({ salesAppointment }: { salesAppointment: SalesAppointmentInterface }): JSX.Element => {
	const salesAppointmentHasMeetingUrl = salesAppointment?.meetingUrl && salesAppointment?.meetingUrl.length > 0;
	const salesAppointmentFiles = salesAppointment?.salesAppointmentFiles || [];
	const noNotesOrFiles = salesAppointmentFiles.length === 0 && salesAppointment?.notes === '';

	return (
		<Container
			className="w-100 position-relative"
			style={{
				maxHeight: noNotesOrFiles ? '100%' : '70%',
				height: '100%',
			}}
		>
			{salesAppointmentHasMeetingUrl ? (
				<Meeting>
					<StyledIframe src={salesAppointment?.meetingUrl} allow="camera; microphone; display-capture" />
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
	border-radius: 5px;
`;

const StyledIframe = styled.iframe`
	height: 100%;
	aspect-ratio: 16/9;
	border-radius: 5px;
`;

export default MeetingBlock;
