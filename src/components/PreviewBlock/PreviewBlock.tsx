import styled from 'styled-components';
import Container from '../Container/Container';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { ScaleLoader } from 'react-spinners';
import { IoClose } from 'react-icons/io5';
import { Modal } from 'react-bootstrap';
import { useMobileContext } from '../context/MobileContext';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const PreviewBlock = ({
	previewFile,
	setPreviewFile,
}: {
	previewFile: {
		fileType: string;
		filePath: string;
	};
	setPreviewFile: React.Dispatch<
		React.SetStateAction<{
			fileType: string;
			filePath: string;
		} | null>
	>;
}) => {
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	const getPreviewContainerWidth = (): number => {
		const previewContainer = document.getElementById('preview-container');
		if (!previewContainer) return 0;
		// return width - 3rem
		return previewContainer.clientWidth - 53;
	};

	// wait 1s before rendering to allow for the preview container to render
	const [renderPreview, setRenderPreview] = useState<boolean>(false);

	React.useEffect((): void => {
		setTimeout(() => {
			setRenderPreview(true);
		}, 1000);
	}, []);

	const getPreviewMaxHeight = (): number => {
		const previewContainer = document.getElementById('left-container');
		if (!previewContainer) return 0;
		return previewContainer.clientHeight;
	};

	const previewFileIsExcel = previewFile.fileType === 'xls' || previewFile.fileType === 'xlsx';
	const previewFileIsWordDocument = previewFile.fileType === 'doc' || previewFile.fileType === 'docx';

	const { isMobile } = useMobileContext();

	if (isMobile) {
		return (
			<Modal show={true} onHide={() => setPreviewFile(null)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Preview</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{!renderPreview ? (
						<div className="d-flex justify-content-center align-items-center flex-column h-100">
							<ScaleLoader color="#102526" />
							<span>Loading preview</span>
						</div>
					) : previewFile.fileType === 'pdf' ? (
						<Document
							className={'h-100'}
							file={previewFile?.filePath}
							onLoadSuccess={onDocumentLoadSuccess}
							loading={
								<div className="d-flex justify-content-center align-items-center flex-column h-100">
									<ScaleLoader color="#102526" />
									<span>Loading preview</span>
								</div>
							}
						>
							<Page
								width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
								pageNumber={pageNumber}
							/>
						</Document>
					) : previewFileIsExcel ? (
						<div>
							<iframe
								src={`https://view.officeapps.live.com/op/embed.aspx?src=${previewFile.filePath}`}
								width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
								height={getPreviewMaxHeight()}
							/>
						</div>
					) : previewFileIsWordDocument ? (
						<div>
							<iframe
								src={`https://view.officeapps.live.com/op/embed.aspx?src=${previewFile.filePath}`}
								width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
								height={getPreviewMaxHeight()}
							/>
						</div>
					) : (
						<img src={previewFile?.filePath} alt="preview" style={{ width: '100%' }} />
					)}
				</Modal.Body>
			</Modal>
		);
	}

	return (
		<PreviewContainer theme={{ maxHeight: getPreviewMaxHeight() }}>
			<Close onClick={() => setPreviewFile(null)}>
				<IoClose size={30} />
			</Close>
			<Container className="overflow-auto w-100 h-100 p-4" id="preview-container">
				{!renderPreview ? (
					<div className="d-flex justify-content-center align-items-center flex-column h-100">
						<ScaleLoader color="#102526" />
						<span>Loading preview</span>
					</div>
				) : previewFile.fileType === 'pdf' ? (
					<Document
						className={'h-100'}
						file={previewFile?.filePath}
						onLoadSuccess={onDocumentLoadSuccess}
						loading={
							<div className="d-flex justify-content-center align-items-center flex-column h-100">
								<ScaleLoader color="#102526" />
								<span>Loading preview</span>
							</div>
						}
					>
						<Page
							width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
							pageNumber={pageNumber}
						/>
					</Document>
				) : previewFileIsExcel ? (
					<div>
						<iframe
							src={`https://view.officeapps.live.com/op/embed.aspx?src=${previewFile.filePath}`}
							width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
							height={getPreviewMaxHeight()}
						/>
					</div>
				) : previewFileIsWordDocument ? (
					<div>
						<iframe
							src={`https://view.officeapps.live.com/op/embed.aspx?src=${previewFile.filePath}`}
							width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
							height={getPreviewMaxHeight()}
						/>
					</div>
				) : (
					<img src={previewFile?.filePath} alt="preview" style={{ width: '100%' }} />
				)}
			</Container>
		</PreviewContainer>
	);
};

const Close = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	cursor: pointer;
	display: flex;
	justify-content: end;
	z-index: 9999;
`;

const PreviewContainer = styled.div`
	max-height: ${props => props.theme.maxHeight}px;
	position: relative;
	display: flex;
	gap: 0.5rem;
	height: 100%;
	overflow: auto;
	margin-left: 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

export default PreviewBlock;
