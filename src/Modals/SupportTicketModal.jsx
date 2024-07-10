import Modal from "react-bootstrap/Modal";
import { TextLessMore } from "@components";

const SupportTicketModal = ({ showView, setShowView, selectedSupport }) => {
	return (
		<Modal
			show={showView}
			className="elements-modal ticket-modal "
			onHide={() => setShowView(false)}
			dialogClassName="modal-card"
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static">
			<Modal.Header className="fw-600" closeButton>
				<div className="d-flex flex-column align-items-center justify-content-center">
					<div className="payment-pay-logo text-center ">
						<img src="/assets/images/logo.png" alt="logo" />
					</div>
					<div className="text-center fs-18 fw-700 mt-3 ">Support Ticket No: {selectedSupport?.slug}</div>
				</div>
			</Modal.Header>

			<Modal.Body>
				<div className="d-flex align-items-center justify-content-between justify-content-lg-start gap-2 fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Subject:</span>
					<div className="blue-clr fs-14">{selectedSupport.subject}</div>
				</div>

				<div className="d-flex align-items-center justify-content-between justify-content-lg-start gap-2 fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Booking Id:</span>
					<div className="blue-clr fs-14">{selectedSupport.orderId?.slug}</div>
				</div>

				<div className="d-flex align-items-center justify-content-between justify-content-lg-start gap-2 fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Service Name: </span>
					<div className="blue-clr fs-14">{selectedSupport.orderId?.service?.category?.name}</div>
				</div>
				<div className="d-flex align-items-center justify-content-between justify-content-lg-start gap-2 fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Customer Email: </span>
					<div className="blue-clr fs-14"> {selectedSupport.orderId?.buyer?.email}</div>
				</div>

				<div className="d-flex align-items-center justify-content-between justify-content-lg-start gap-2 fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Seller Email: </span>
					<div className="blue-clr fs-14"> {selectedSupport.orderId?.seller?.email}</div>
				</div>

				<div className="mt-3 ">
					<span className=" fs-16 fw-600 ">Description:</span>
					<div className="blue-clr fs-14 support-scrolls">
						{"amzah a m z a hamzah amzahamzaham "}
						{/* <TextLessMore text={selectedSupport?.description} maxCharacters={98} /> */}
					</div>
				</div>
				{selectedSupport.attachments.length > 0 && (
					<div className="mt-3 ">
						<span className=" fs-16  fw-600">Attachments:</span>
						<div className="row">
							{selectedSupport?.attachments.map((item) => {
								return (
									<div className="col-md-4">
										<div className="img-preview mb-4 support-height   ">
											<img src={item} className="pre-img support-img" />
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}

				<div className="d-inline-flex justify-content-center w-100">
					<button
						onClick={() => {
							setShowView(false);
						}}
						className="primary-btn  mt-3 w-110 ">
						Close
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default SupportTicketModal;
