const EarningsSkeltons = () => {
	return (
		<div>
			<div className="container py-4">
				<div className="row">
					<div className="col-lg-3">
						<div className="card-box mb-4">
							<div className="loading-animation w-110 h-25 mx-auto mb-lg-4 mb-3"></div>
							<div className="loading-animation w-60 h-25 mx-auto mb-lg-4 mb-3"></div>
							<div className="d-flex align-items-center justify-content-center"></div>
							<div className="bb-1 py-lg-1 loading-animation h-100 w-100"></div>

							<div className="loading-animation w-110 h-25 mb-lg-4 mb-3 mt-3"></div>
							<div className="d-flex align-items-center justify-content-between gap-3  mb-3">
								<div className="loading-animation w-110 h-15"></div>
								<div className="loading-animation w-50px h-15"></div>
							</div>
							<div className="d-flex align-items-center justify-content-between gap-3  mb-3">
								<div className="loading-animation w-110 h-15"></div>
								<div className="loading-animation w-50px h-15"></div>
							</div>
							<div className="d-flex align-items-center justify-content-between gap-3  mb-3">
								<div className="loading-animation w-110 h-15"></div>
								<div className="loading-animation w-50px h-15"></div>
							</div>
							<div className="d-flex align-items-center justify-content-between gap-3  mb-3">
								<div className="loading-animation w-110 h-15"></div>
								<div className="loading-animation w-50px h-15"></div>
							</div>
						</div>

						<div className="card-box mb-4">
							<div className="loading-animation w-110 h-25 mb-lg-4 mb-3 mx-auto"></div>
							<div className="loading-animation w-50px h-25 mb-lg-4 mb-3 mx-auto"></div>
						</div>
					</div>
					<div className="col-lg-9">
						<div className="loading-animation w-250px h-40 mb-2"></div>

						<div className="card-box mb-4">
							<div className="loading-animation w-250px h-25 mb-lg-4 mb-3 mx-auto"></div>
							<div className="d-flex align-items-center justify-content-center">
								<div className="d-flex align-items-center gap-3 fw-600 grey-text fs-md-14 mb-lg-4 mb-3">
									<div className="loading-animation w-154 h-46"></div>
								</div>
							</div>

							<div className={`earning-scroll `}>
								<div className="card-box mb-4">
									<div className="row align-items-center">
										<div className="col-md-6 mb-md-0 mb-4">
											<div className="d-flex align-items-center gap-2">
												<div className="loading-animation w-50px h-15"></div>

												<div></div>
											</div>
											<a className="pointer d-flex align-items-center flex-1 gap-3 mt-3">
												<div className="patient-img">
													<div className="loading-animation w-100 border-50 h-100"></div>
												</div>
												<div className="patient-details">
													<div className="loading-animation h-15 w-50px"></div>
												</div>
											</a>
										</div>
										<div className="col-md-6 text-md-end">
											<div className="fs-md-18 default-text fw-600 mb-0 mb-md-4">
												{" "}
												<button className="loading-animation w-110 h-40 "></button>
											</div>

											<div className="fs-md-18 default-text fw-600 mb-0 mb-md-4"></div>
											<div className="d-flex justify-content-md-end align-items-center gap-2 light-text1">
												<div className="loading-animation h-25 w-50px"></div>
											</div>
										</div>
									</div>
								</div>

								<div className="card-box mb-4">
									<div className="row align-items-center">
										<div className="col-md-6 mb-md-0 mb-4">
											<div className="d-flex align-items-center gap-2">
												<div className="loading-animation w-50px h-15"></div>

												<div></div>
											</div>
											<a className="pointer d-flex align-items-center flex-1 gap-3 mt-3">
												<div className="patient-img">
													<div className="loading-animation w-100 border-50 h-100"></div>
												</div>
												<div className="patient-details">
													<div className="loading-animation h-15 w-50px"></div>
												</div>
											</a>
										</div>
										<div className="col-md-6 text-md-end">
											<div className="fs-md-18 default-text fw-600 mb-0 mb-md-4">
												{" "}
												<button className="loading-animation w-110 h-40 "></button>
											</div>

											<div className="fs-md-18 default-text fw-600 mb-0 mb-md-4"></div>
											<div className="d-flex justify-content-md-end align-items-center gap-2 light-text1">
												<div className="loading-animation h-25 w-50px"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EarningsSkeltons;
