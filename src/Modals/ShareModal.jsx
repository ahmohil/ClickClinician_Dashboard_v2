import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import { CreateReview } from "@services";
import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";

const ShareModal = ({ shareModal, setShareModal, setShowReviewModal, handleShareLink }) => {
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
		// try {
		// 	let payload = {
		// 		rating,
		// 		comment,
		// 		seller: bookingDetails?.seller?._id,
		// 		buyer: bookingDetails?.buyer?._id,
		// 		booking: bookingDetails?._id,
		// 	};

		// 	await CreateReview(bookingDetails.service._id, payload);

		// 	resetStates();
		// 	successToaster("Review Submitted Successfully");
		// } catch (err) {
		// 	failureToaster(err.message);
		// }
	};

	return (
		<Modal
			show={shareModal}
			className=""
			onHide={() => setShareModal(false)}
			dialogClassName="modal-card"
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static">
			<div className="p-box pb-3">
				<div className="d-flex mb-4 align-items-center justify-content-center"></div>
			</div>

			<div className=""></div>

			<div className="fs-24 fw-600 text-center">
				Share Listing
				<span className="cross-ic" onClick={() => setShareModal(false)}>
					<iconify-icon icon="charm:circle-cross"></iconify-icon>
				</span>
			</div>

			<div className=" d-flex justify-content-center share-img my-3 gap-3">
				<span className="fs-md-26  pointer footer-ic" onClick={() => handleShareLink("fb")}>
					<iconify-icon icon="logos:facebook"></iconify-icon>
				</span>
				<span className="fs-md-26  pointer footer-ic " onClick={() => handleShareLink("insta")}>
					<iconify-icon icon="skill-icons:instagram"></iconify-icon>
				</span>

				<span className="fs-md-26  pointer footer-ic " onClick={() => handleShareLink("wsapp")}>
					<iconify-icon icon="logos:whatsapp-icon"></iconify-icon>
				</span>
				<span className="fs-md-26  pointer footer-ic " onClick={() => handleShareLink("x")}>
					<iconify-icon icon="fa6-brands:square-x-twitter"></iconify-icon>
				</span>
			</div>
			<div className="d-flex align-items-center justify-content-center gap-4">
				<div className="link-bg pointer my-3" onClick={() => handleShareLink()}>
					Copy Link
				</div>
			</div>
		</Modal>
	);
};

export default ShareModal;
