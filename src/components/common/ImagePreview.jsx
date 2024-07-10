const ImagePreview = ({ selectedImage, setSelectedImage }) => {
	return (
		<div>
			{selectedImage && (
				<div className="image-preview">
					<div className="full-img">
						<img src={selectedImage} alt="" />
						<a onClick={() => setSelectedImage("")} className="close-img">
							<img src="/assets/images/delete-circled-outline.png" alt="" />
						</a>
						<a href={selectedImage} download target="_blank" className="download-img" rel="noreferrer">
							<span className="iconify" data-icon="material-symbols:download"></span>
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default ImagePreview;
