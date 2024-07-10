import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import { CreateReview } from "@services";
import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";

const ReviewModal = ({ showReviewModal, bookingDetails, setShowReviewModal }) => {
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const howMuchStars = [1, 2, 3, 4, 5];

	const resetStates = () => {
		setComment("");
		setRating(0);
		setShowReviewModal(false);
	};

	const handleSubmit = async () => {
		try {
			let payload = {
				rating,
				comment,
				seller: bookingDetails?.seller?._id,
				buyer: bookingDetails?.buyer?._id,
				booking: bookingDetails?._id,
			};

			// await CreateReview(bookingDetails.service._id, payload);

			resetStates();
			successToaster("Review Submitted Successfully");
		} catch (err) {
			failureToaster(err.message);
		}
	};

	return (
		<Modal
			show={showReviewModal}
			onHide={() => setShowReviewModal(false)}
			centered
			animation={true}
			size="lg"
			className="rating-modal">
			<Modal.Header closeButton className="border-0">
				<Modal.Title>
					<div className="fw-600">Rate your Trainer/{bookingDetails?.seller?.username.toUpperCase()}</div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="form-row">
					<div className="col-12 mb-2 fs-14">
						You completed your session recently. Now it's time to provide feedback.
					</div>
					<div className="col-12 mb-4 mt-4">
						<div className="row justify-content-between">
							<div className="col-md-4 align-self-center">
								<label htmlFor="review" className="mb-3 fs-20 fw-600">
									Select Rating
								</label>
							</div>
							<div className="col-md-8">
								<div className="text-center">
									<StarRating
										stars={howMuchStars}
										rating={rating}
										setRating={setRating}
										hoverRating={hoverRating}
										setHoverRating={setHoverRating}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 my-4">
						<div className="form-group">
							<label htmlFor="review" className="mb-3 fs-16 fw-700">
								Additional Feedback
							</label>
							<textarea
								className="form-control review-textarea "
								placeholder="Leave a comment"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								id="review"
								rows="6"></textarea>
						</div>
					</div>
					<div className="col-12">
						<button
							type="button"
							disabled={!isDataExists(rating) || !isDataExists(comment)}
							onClick={() => handleSubmit()}
							className="primary-btn w-100">
							Submit Feedback
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ReviewModal;
