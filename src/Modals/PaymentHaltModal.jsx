import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";
import { isDataExists } from "../utils";

const PaymentHaltModal = ({ haltModal, setHaltModal, errorMessage }) => {
	const navigate = useNavigate();
	return (
		<Modal
			show={haltModal}
			size="md"
			onHide={() => setHaltModal(false)}
			centered
			className="elements-modal withdrw-modal"
			backdrop="static">
			<Modal.Header className="fw-600" closeButton>
				<div className="withdraw-img">
					<img src="/assets/images/error-alert.png" alt="error" />
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex align-items-center flex-1 gap-3 mb-3">
					<div className="patient-img">{/* <img src={bookingDetails?.buyer?.profileImage} alt="" /> */}</div>
					<div className="patient-details">
						<div>
							Unfortunately, we are unable to process your withdrawal request at this time due to an administrative
							halt.
						</div>

						<div>
							Please try again in 24 hours, and if the issue persists, contact SplitMart Support for assistance.
						</div>
					</div>
				</div>

				<div className="col-12 mt-3">
					<div className=" d-flex align-items-center  justify-content-center gap-2 ">
						<button onClick={() => setHaltModal(false)} className="primary-btn inline-flex gap-3  w-200  mt-2 mt-lg-0">
							<div className="">Cancel</div>
						</button>

						<button
							onClick={() => {
								setHaltModal(false);
								navigate("/support");
							}}
							className="primary-btn w-200   gap-3  mt-2 mt-lg-0">
							<div className="">Contact Support</div>
							<div className="fs-22">
								{" "}
								<iconify-icon icon="mdi:contact"></iconify-icon>
							</div>
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default PaymentHaltModal;
