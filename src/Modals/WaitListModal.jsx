import { Modal } from "react-bootstrap";
import { kebabCaseToTitleCase } from "../transformers/TextFormation";

const WaitListModal = ({ selectedUser, discardSelectedUser }) => {
	return (
		<Modal size="lg" centered show={selectedUser} className="users-details-modals" onHide={discardSelectedUser}>
			<Modal.Header closeButton>
				<Modal.Title>
					<div className="fs-24 fw-700 primary-text">Pre-Launch List</div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="position-relative px-5">
				<div className="custom-table  mh-300 mx-h240 ">
					<div className="custom-row">
						<div className="fs-18 fw-500 w-25 py-2 lh-1">Email</div>
						<div className="fs-16 break-word w-75 py-2">{selectedUser?.email}</div>
					</div>

					<div className="custom-row">
						<div className="fs-18 fw-500 w-25 py-2 lh-1">Phone</div>
						<div className="fs-16 break-word w-75 py-2">{selectedUser?.phone}</div>
					</div>
					<div className="custom-row align-items-start">
						<div className="fs-18 fw-500 w-25 py-2 lh-1">Interests</div>
						<div className="fs-16 break-word w-75 py-2">{selectedUser?.interests && selectedUser?.interests.map((e) => kebabCaseToTitleCase(e)).join(", ")}</div>
					</div>
					<div className="custom-row">
						<div className="fs-18 fw-500 w-25 py-2 lh-1">Price</div>
						<div className="fs-16 break-word w-75 py-2">{selectedUser?.price}</div>
					</div>
					<div className="custom-row align-items-start">
						<div className="fs-18 fw-500 w-25 py-2 lh-1">Suggestion</div>
						<div className="fs-16 break-word w-75 py-2">{selectedUser?.suggestion}</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default WaitListModal;
