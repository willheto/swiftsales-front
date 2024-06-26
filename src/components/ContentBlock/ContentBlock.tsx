import {
	BsFileEarmarkPdf,
	BsFiletypeDoc,
	BsFileEarmarkExcel,
	BsFileEarmarkPpt,
	BsFileEarmarkImage,
	BsFileEarmark,
} from 'react-icons/bs';
import styled from 'styled-components';
import Container from '../Container/Container';
import React from 'react';
import SwiftSalesButton from '../SwiftSalesComponents/SwiftSalesComponents';
import { pdfjs } from 'react-pdf';
import JSZip from 'jszip';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const ContentBlock = ({
	setPreviewFile,
	previewFile,
	salesAppointmentFiles,
	salesAppointment,
}: {
	setPreviewFile: React.Dispatch<
		React.SetStateAction<{
			fileType: string;
			filePath: string;
		} | null>
	>;
	previewFile: {
		fileType: string;
		filePath: string;
	} | null;
	salesAppointmentFiles: SalesAppointmentFileInterface[];
	salesAppointment: SalesAppointmentInterface;
}): JSX.Element => {
	const getIcon = (fileType: string): JSX.Element => {
		const iconSize = 40;
		switch (fileType) {
			case 'pdf':
				return <BsFileEarmarkPdf size={iconSize} fill="#102526" />;
			case 'doc':
			case 'docx':
				return <BsFiletypeDoc size={iconSize} fill="#102526" />;
			case 'xls':
			case 'xlsx':
				return <BsFileEarmarkExcel size={iconSize} fill="#102526" />;
			case 'ppt':
			case 'pptx':
				return <BsFileEarmarkPpt size={iconSize} fill="#102526" />;
			case 'jpg':
			case 'jpeg':
			case 'png':
				return <BsFileEarmarkImage size={iconSize} fill="#102526" />;
			default:
				return <BsFileEarmark size={iconSize} fill="#102526" />;
		}
	};

	const handleDownloadAllFiles = (salesAppointmentFiles: SalesAppointmentFileInterface[]): void => {
		const zip = new JSZip();

		// Create a promise for each file fetch operation
		const filePromises = salesAppointmentFiles.map(salesAppointmentFile => {
			return fetch(salesAppointmentFile.file.filePath)
				.then(response => {
					if (!response.ok) {
						throw new Error(`Failed to fetch ${salesAppointmentFile.file.filePath}`);
					}
					return response.blob(); // Get the file data as a Blob
				})
				.then(blob => {
					zip.file(salesAppointmentFile.file.fileName, blob);
				});
		});

		// Wait for all file fetch operations to complete
		Promise.all(filePromises)
			.then(() => {
				zip.generateAsync({ type: 'blob' }).then(content => {
					const url = window.URL.createObjectURL(content);
					const link = document.createElement('a');
					link.href = url;
					link.download = 'files.zip';
					link.click();
				});
			})
			.catch(error => {
				console.error('Error downloading files:', error);
			});
	};

	const hasNotes = salesAppointment?.notes && salesAppointment?.notes.length > 0;
	const [activeTab, setActiveTab] = React.useState<'notes' | 'files'>(hasNotes ? 'notes' : 'files');

	return (
		<Container className="p-4 overflow-auto">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<div className="d-flex align-items-center gap-2">
					{salesAppointment?.notes && (
						<h4
							style={{
								cursor: 'pointer',
								color: activeTab === 'notes' ? '#102526' : '#ccc',
							}}
							onClick={() => {
								setActiveTab('notes');
							}}
						>
							Notes
						</h4>
					)}
					{salesAppointmentFiles.length > 0 && (
						<h4
							style={{
								cursor: 'pointer',
								color: activeTab === 'files' ? '#102526' : '#ccc',
							}}
							onClick={() => {
								setActiveTab('files');
							}}
						>
							Files
						</h4>
					)}
				</div>
				{activeTab === 'files' && salesAppointmentFiles.length > 1 && (
					<SwiftSalesButton
						size="small"
						variant="primary"
						onClick={() => {
							handleDownloadAllFiles(salesAppointmentFiles);
						}}
					>
						Download all
					</SwiftSalesButton>
				)}
			</div>
			{activeTab === 'notes' && <div>{salesAppointment?.notes}</div>}

			{activeTab === 'files' && (
				<div
					className="d-grid gap-4 overflow-auto"
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
					}}
				>
					{salesAppointmentFiles.map(salesAppointmentFile => {
						const file = salesAppointmentFile.file;
						const fileType = file.fileName.split('.').pop();

						if (!fileType) return null;

						return (
							<FileContainer key={file.fileID}>
								<div className="d-flex flex-column align-items-center justify-content-center">
									<span>{getIcon(fileType)}</span>
									<span
										style={{
											wordBreak: 'break-all',
										}}
									>
										{file.fileName}
									</span>
								</div>
								<div className="d-flex gap-2 flex-wrap justify-content-center">
									<SwiftSalesButton
										size="small"
										variant="primary"
										onClick={() => {
											window.open(file.filePath, '_blank');
										}}
									>
										Download
									</SwiftSalesButton>

									<SwiftSalesButton
										size="small"
										variant="primary"
										onClick={() => {
											if (previewFile && previewFile.filePath === file.filePath)
												return setPreviewFile(null);
											setPreviewFile({
												fileType,
												filePath: file.filePath,
											});
										}}
									>
										Preview
									</SwiftSalesButton>
								</div>
							</FileContainer>
						);
					})}
				</div>
			)}
		</Container>
	);
};

export default ContentBlock;

const FileContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	border: 1px solid #ccc;
	padding: 15px;
	border-radius: 5px;
`;
