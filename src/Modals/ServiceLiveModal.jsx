import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../transformers/TextFormation";

const ServiceLiveModal = ({ liveModal, setLiveModal, sellerName, setActiveTab }) => {
	const navigate = useNavigate();

	return (
		<Modal
			show={liveModal}
			onHide={() => setLiveModal(false)}
			centered
			animation={true}
			className="congrs-modal weekly-slot-modal">
			<Modal.Header closeButton className="border-0">
				<Modal.Title></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex justify-content-center position-relative">
					<div className="congr-icon">
						<iconify-icon icon="solar:cup-bold"></iconify-icon>
					</div>
				</div>
				<div className="fs-md-24 fw-600 my-3 text-center textPrimary">
					Congratulations {capitalizeFirstLetter(sellerName)}
				</div>

				<div className="form-row">
					<div className="col-12 mb-2 fs-md-20">
						Your service is now live on SplitMart. Your existing and new customers can now easily book your group or 1:1
						sessions.
					</div>
					<div className="col-12 mb-4 mt-4">
						<div className="text-center fs-md-20">
							You may contact SplitMart at <a className="textPrimary   pointer">info@splitmart.com</a> with any
							questions. We are excited and ready to help you succeed.
						</div>
					</div>
					<div className="col-12 my-4">
						<div className="form-group"></div>
					</div>
					<div className="col-12">
						<button
							type="button"
							onClick={() => {
								setLiveModal(false);
								setActiveTab(1);
								navigate("/services/search");
							}}
							className="primary-btn w-100">
							Close
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ServiceLiveModal;
