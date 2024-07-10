const ErrorPage = () => {
	return (
		<div className="vh-100 d-flex align-items-center">
			<div className="container">
				<div className="row justify-content-around align-items-center">
					<div className="col-lg-4">
						<div className="logo-error">
							<img className="w-100" src="/assets/images/404.webp" alt="" />
						</div>
					</div>
					<div className="col-lg-6 px-md-5 ">
						<div className="error-text fs-30  fw-700 text-center p-4">Oops! Something went wrong</div>
						<div className="fs-16 color-white text-center mb-4">
							We apologize for the inconvenience, it appears our website is experiencing a temporary outage. Our technical team is currently working on the issue! Please bear with us while we get
							things back up. Thank you for your patience.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
