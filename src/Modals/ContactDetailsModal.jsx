import Modal from "react-bootstrap/Modal";
import { TextLessMore } from "@components";

const ContactDetailsModal = ({ selectedContact, discardSelectedContact }) => {
	return (
		<Modal centered show={selectedContact} className="users-details-modals" onHide={discardSelectedContact}>
			<Modal.Header closeButton>
				<Modal.Title className=" text-center fs-22 fw-700">Contact Details</Modal.Title>
			</Modal.Header>
			<Modal.Body className="position-relative">
				<div className="custom-table  mh-300">
					{!!selectedContact.subject && (
						<div className="custom-row">
							<div className="fs-18 fw-500  w-50 py-2 lh-1">Subject</div>

							<div className="fs-16 break-word w-50 py-2">
								<TextLessMore text={selectedContact?.subject} maxCharacters={45} />
							</div>
						</div>
					)}

					<div className="custom-row">
						<div className="fs-18 fw-500  w-50 py-2 lh-1">First Name</div>
						<div className="fs-16 break-word w-50 py-2 ">
							<TextLessMore text={selectedContact?.firstName} maxCharacters={45} />
						</div>
					</div>
					<div className="custom-row">
						<div className="fs-18 fw-500  w-50 py-2 lh-1">Phone</div>
						<div className="fs-16 break-word w-50 py-2">{selectedContact?.phone}</div>
					</div>
					<div className="custom-row">
						<div className="fs-18 fw-500  w-50 py-2 lh-1">Email</div>
						<div className="fs-16 break-word w-50 py-2">{selectedContact?.email}</div>
					</div>

					{!!selectedContact.message && (
						<div className="custom-row mt-2">
							<div className="fs-16">
								<div className="fs-18 fw-600">Message </div>
								<div className="mt-2">
									<TextLessMore text={selectedContact?.message} />
								</div>
							</div>
						</div>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ContactDetailsModal;
