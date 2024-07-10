import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { failureToaster, successToaster, isDataExists } from "@utils";
import { Link, useNavigate } from "react-router-dom";

const ErrorModal = ({ showErrorModal, bookingDetails, setErrorModal }) => {
	const navigate = useNavigate();
	const [comment, setComment] = useState("");
	const [click, setClick] = useState(false);

	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const howMuchStars = [1, 2, 3, 4, 5];

	const resetStates = () => {
		setComment("");
		setRating(0);
		setErrorModal(false);
	};

	return (
		<Modal show={showErrorModal} onHide={() => setErrorModal()} centered animation={true} className="review-modal">
			<Modal.Header closeButton className="border-0">
				<Modal.Title>
					<div className="fw-600 mx-auto">Booking Verfication Missing</div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="form-row">
					<div className="col-12 my-4">
						<div className="form-group">
							<label htmlFor="review" className="mb-3 fs-16 fw-500">
								First verify the completion of booking to submit the review
							</label>
						</div>
					</div>

					<div className="col-12 text-center">
						<Link
							to={`/services/details/${bookingDetails?.service?.slug}`}
							state={{ booking: bookingDetails?.slug, address: true }}
							className="primary-btn">
							Verify Booking
						</Link>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ErrorModal;
