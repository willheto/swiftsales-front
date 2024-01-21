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

const FileBlock = ({
	setPreviewFile,
	previewFile,
	salesAppointmentFiles,
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
}) => {
	const getIcon = (fileType: string) => {
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

	const handleDownloadAllFiles = salesAppointmentFiles => {
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

	return (
		<Container className="overflow-auto">
			<h3>Files</h3>
			<div className="d-flex flex-column gap-2">
				{salesAppointmentFiles.length > 1 && (
					<SwiftSalesButton
						style={{
							width: '100% !important',
						}}
						size="large"
						variant="primary"
						onClick={() => {
							handleDownloadAllFiles(salesAppointmentFiles);
						}}
					>
						Download all files as a zip
					</SwiftSalesButton>
				)}
				{salesAppointmentFiles.map(salesAppointmentFile => {
					const file = salesAppointmentFile.file;
					const fileType = file.fileName.split('.').pop();

					if (!fileType) return null;

					return (
						<FileContainer key={file.fileID}>
							<span>{getIcon(fileType)}</span>
							<span
								style={{
									wordBreak: 'break-all',
								}}
							>
								{file.fileName}
							</span>
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
		</Container>
	);
};

export default FileBlock;

const FileContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	border: 1px solid #ccc;
	padding: 15px;
	border-radius: 5px;
`;
