import Viewer from "react-viewer";
import { NO_IMAGE } from "@constants";

// Helping Link
// https://github.com/infeng/react-viewer

const EnrichImageViewer = ({ previewImages, previewVisible, setPreviewVisible, selectedImageIndex }) => {
	let tempImages = [];

	if (previewImages?.length > 0) {
		previewImages.forEach((ele) => {
			tempImages.push({ src: ele?.url, alt: NO_IMAGE });
		});
	}

	const handleDownload = () => {
		const image = tempImages[selectedImageIndex]; // Get the currently selected image
		const link = document.createElement("a");
		link.href = image.src;
		link.download = image.alt;
		link.target = "_blank";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div>
			<Viewer
				visible={previewVisible}
				onClose={() => {
					setPreviewVisible(false);
				}}
				downloadable={true}
				noImgDetails={false}
				images={tempImages}
				activeIndex={selectedImageIndex}
				downloadInNewWindow={true}
				customToolbar={(toolbars) =>
					toolbars.map((toolbar) =>
						toolbar.key === "download"
							? {
									...toolbar,
									render: (
										<i className="react-viewer-icon " onClick={handleDownload}>
											<iconify-icon icon="ic:baseline-download" width="24" height="24"></iconify-icon>
										</i>
									),
							  }
							: toolbar
					)
				}
			/>
		</div>
	);
};

export default EnrichImageViewer;
