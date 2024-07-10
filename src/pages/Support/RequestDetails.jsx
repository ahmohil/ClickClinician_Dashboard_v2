const RequestDetails = () => {
	return (
		<div className="container profile py-4">
			<div className="row mb-lg-4">
				<div className="col-md-4 mb-4">
					<div className="mb-md-4 mb-3">
						<h3 className="fs-24 fw-700">Request ID: 2424</h3>
						<p className="mb-0 fs-14 light-text fw-500">
							Here are your existing or completed requests, you can opne new request via
							<a className="default-text fw-500 underline pointer"> New Support Ticket</a>
						</p>
					</div>
				</div>
			</div>

			<div className="row justify-content-center">
				<div className="col-lg-8 col-md-7">
					<div className="card-box scroll-list">
						<div className="d-flex align-items-start gap-2 mb-4">
							<div className="d-flex align-items-center flex-1 gap-3">
								<div className="patient-img">
									<img src="/assets/images/user.png" alt="" />
								</div>
								<div className="patient-details">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<div className="fs-md-14 light-text1 fw-600 mb-2">Raj Raunak</div>
											<p className="fs-md-14 fw-500 grey-text mb-0">online</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="inner-chat">
							<div className="mb-3">
								<div className="sender mb-1">
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>
							<div className="text-end mb-4">
								<div className="receiver mb-1">
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>

							<div className="mb-3">
								<div className="sender mb-1">
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>
							<div className="text-end mb-4">
								<div className="receiver mb-1">
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>

							<div className="mb-3">
								<div className="sender mb-1">
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>
							<div className="text-end mb-4">
								<div className="receiver mb-1">
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>

							<div className="mb-3">
								<div className="sender mb-1">
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>
							<div className="text-end mb-4">
								<div className="receiver mb-1">
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>

							<div className="mb-3">
								<div className="sender mb-1">
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>
							<div className="text-end mb-4">
								<div className="receiver mb-1">
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
								</div>
								<div className="sender-img mb-1">
									<img src="/assets/images/user.png" height={20} alt="" />
								</div>
								<div className="light-text1 fw-600 fs-10">4:15pm</div>
							</div>
						</div>

						<div className="chat-input">
							<input type="text" placeholder="Type something" />
							<div className="send-btns d-flex align-items-center gap-3">
								<a className="pointer">
									<img src="/assets/images/Paperclip.svg" alt="" />{" "}
								</a>
								<a className="pointer">
									<img src="/assets/images/upload.svg" alt="" />{" "}
								</a>
								<a className="pointer">
									<img src="/assets/images/sender.svg" alt="" />{" "}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestDetails;
