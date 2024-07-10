const ServiceCardSkeltons = () => {
	return (
		<>
			<div className={`list-card pointer `}>
				<div className={`image-swiper card-img `}>
					<div className="loading-animation h-100 w-100"></div>
				</div>
				<div className="card-details">
					<div className="d-flex align-items-center justify-content-between">
						<div className="loading-animation h-25 w-110"></div>
						<div className="d-flex flex-column align-items-end gap-2">
							<div className="loading-animation h-25 w-110"></div>
							<div className="loading-animation h-25 w-110"></div>
						</div>
					</div>

					<div className="d-flex align-items-center justify-content-between mt-3">
						<div className="loading-animation h-25 w-110"></div>
						<div className="loading-animation h-25 w-110"></div>
					</div>
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
					</div>

					<div className="d-flex align-items-center justify-content-between  pb-2">
						<div className="d-flex align-items-center gap-2"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceCardSkeltons;
