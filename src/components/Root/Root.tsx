import api from '@src/api';
import React, { useCallback, useEffect } from 'react';
import MeetingBlock from '../MeetingBlock.tsx/MeetingBlock';
import FileBlock from '../FileBlock/FileBlock';
import { ScaleLoader } from 'react-spinners';
import Container from '../Container/Container';
import styled from 'styled-components';
import PreviewBlock from '../PreviewBlock/PreviewBlock';

const Root = () => {
	const [salesAppointment, setSalesAppointment] = React.useState<SalesAppointmentInterface>();
	const salesAppointmentFiles = salesAppointment?.salesAppointmentFiles || [];

	const getSalesAppointment = useCallback(async () => {
		try {
			const queryParams = new URLSearchParams(window.location.search);
			const salesAppointmentID = queryParams.get('salesAppointmentID');

			if (!salesAppointmentID) throw new Error('No salesAppointmentID provided');
			const response = await api.salesAppointments.getSalesAppointment(salesAppointmentID);

			//@ts-ignore
			setSalesAppointment(response.salesAppointment);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getSalesAppointment();
	}, [getSalesAppointment]);

	const [previewFile, setPreviewFile] = React.useState<{
		fileType: string;
		filePath: string;
	} | null>(null);

	if (!salesAppointment) {
		return (
			<div className="w-100 h-100 align-items-center justify-content-center d-flex flex-column">
				<Container className="justify-content-center align-items-center d-flex flex-column p-5">
					<ScaleLoader color="rgb(16, 37, 38)" className="mb-4" />
					Getting your meeting ready...
				</Container>
			</div>
		);
	}

	return (
		<div className="w-100 h-100 justify-content-center d-flex gap-2 p-4">
			<div
				className="d-flex gap-2"
				style={{
					width: previewFile ? '60%' : '100%',
					transition: 'width 1s',
					maxWidth: '1400px',
				}}
			>
				<MeetingBlock salesAppointment={salesAppointment} />
				<FileBlock
					setPreviewFile={setPreviewFile}
					previewFile={previewFile}
					salesAppointmentFiles={salesAppointmentFiles}
				/>
			</div>
			<div
				style={{
					width: previewFile ? '40%' : '0%',
					transition: 'width 1s',
				}}
			>
				{previewFile && <PreviewBlock setPreviewFile={setPreviewFile} previewFile={previewFile} />}
			</div>
		</div>
	);
};

const FileContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	border: 1px solid #ccc;
	padding: 15px;
	border-radius: 5px;
`;

export default Root;
