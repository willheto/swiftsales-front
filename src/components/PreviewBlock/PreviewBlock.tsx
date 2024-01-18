import styled from 'styled-components';
import Container from '../Container/Container';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { ScaleLoader } from 'react-spinners';
import { IoClose } from 'react-icons/io5';

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

	const getPreviewContainerWidth = () => {
		const previewContainer = document.getElementById('preview-container');
		if (!previewContainer) return 0;
		// return width - 3rem
		return previewContainer.clientWidth - 53;
	};

	// wait 1s before rendering to allow for the preview container to render
	const [renderPreview, setRenderPreview] = useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setRenderPreview(true);
		}, 1000);
	}, []);

	return (
		<PreviewContainer>
			<Close onClick={() => setPreviewFile(null)}>
				<IoClose size={30} />
			</Close>
			<Container className="overflow-auto w-100 h-100" id="preview-container">
				{!renderPreview ? (
					<div
						className="d-flex justify-content-center align-items-center flex-column"
						style={{
							height: 'inherit',
						}}
					>
						<ScaleLoader color="#102526" />
						<span>Loading preview</span>
					</div>
				) : previewFile.fileType === 'pdf' ? (
					<Document file={previewFile?.filePath} onLoadSuccess={onDocumentLoadSuccess}>
						<Page
							width={getPreviewContainerWidth() > 0 ? getPreviewContainerWidth() : 300}
							pageNumber={pageNumber}
						/>
					</Document>
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
	position: relative;
	display: flex;
	gap: 0.5rem;
	height: 100%;
	overflow: auto;
`;

export default PreviewBlock;
