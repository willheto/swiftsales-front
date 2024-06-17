import api from '@src/api';
import React, { useCallback, useEffect } from 'react';
import MeetingBlock from '../MeetingBlock.tsx/MeetingBlock';
import { ScaleLoader } from 'react-spinners';
import Container from '../Container/Container';
import PreviewBlock from '../PreviewBlock/PreviewBlock';
import { useMobileContext } from '../context/MobileContext';
import ContentBlock from '../ContentBlock/ContentBlock';

const Root = (): JSX.Element => {
	const [error, setError] = React.useState<Error | null>(null);
	const [salesAppointment, setSalesAppointment] = React.useState<SalesAppointmentInterface>();
	const salesAppointmentFiles = salesAppointment?.salesAppointmentFiles || [];

	const getSalesAppointment = useCallback(async (): Promise<void> => {
		try {
			const queryParams = new URLSearchParams(window.location.search);
			const salesAppointmentID = queryParams.get('salesAppointmentID');

			if (!salesAppointmentID) throw new Error('No salesAppointmentID provided');
			const response = await api.salesAppointments.getSalesAppointment(salesAppointmentID);

			// @ts-expect-error
			if (response.salesAppointment === null) {
				throw new Error(`No salesAppointment with ID ${salesAppointmentID} found`);
			}
			// @ts-ignore
			setSalesAppointment(response.salesAppointment);
		} catch (error: any) {
			setError(error);
			console.error(error);
		}
	}, []);

	useEffect((): void => {
		getSalesAppointment();
	}, [getSalesAppointment]);

	const [previewFile, setPreviewFile] = React.useState<{
		fileType: string;
		filePath: string;
	} | null>(null);

	const { isMobile } = useMobileContext();

	if (!salesAppointment) {
		return (
			<div className="w-100 h-100 align-items-center justify-content-center d-flex flex-column">
				<Container className="justify-content-center align-items-center d-flex flex-column p-5">
					{error ? (
						<>
							<h2 className="mb-4">Something went wrong</h2>
							<p className="mb-4 text-danger">{error.message}</p>
						</>
					) : (
						<>
							<ScaleLoader color="rgb(16, 37, 38)" className="mb-4" />
							Getting your meeting ready...
						</>
					)}
				</Container>
			</div>
		);
	}

	return (
		<div className="w-100 h-100 justify-content-center d-flex p-2">
			<div
				className="d-flex flex-column gap-2 h-100"
				id="left-container"
				style={{
					width: previewFile && !isMobile ? '60%' : '100%',
					transition: 'width 1s',
					maxWidth: '1400px',
				}}
			>
				<MeetingBlock salesAppointment={salesAppointment} />

				{salesAppointmentFiles.length > 0 || salesAppointment.notes !== '' ? (
					<ContentBlock
						setPreviewFile={setPreviewFile}
						previewFile={previewFile}
						salesAppointmentFiles={salesAppointmentFiles}
						salesAppointment={salesAppointment}
					/>
				) : null}
			</div>
			<div
				style={{
					width: previewFile && !isMobile ? '40%' : '0%',
					transition: 'width 1s',
				}}
			>
				{previewFile && <PreviewBlock setPreviewFile={setPreviewFile} previewFile={previewFile} />}
			</div>
		</div>
	);
};

export default Root;
