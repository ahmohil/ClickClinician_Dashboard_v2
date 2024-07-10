import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";
import { capitalizeFirstLetter } from "../transformers/TextFormation";
import { Button } from "../components";

const BuyerModal = ({
	buyerModal,
	bookingDetails,
	setBuyerModal,
	rescheuleRequest,
	onCancelBooking,
	isSending,
	text,
	setText,
}) => {
	return (
		<Modal
			show={buyerModal}
			size="md"
			onHide={() => {
				setBuyerModal(false);
				setText("");
			}}
			centered
			className="elements-modal"
			backdrop="static">
			<Modal.Header className="fw-600 fs-md-18" closeButton>
				Consider notifying your customer of possible rescheduling options
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex align-items-center flex-1 gap-3 mb-3">
					<div className="patient-img">
						<img src={bookingDetails?.buyer?.profileImage} alt="" />
					</div>
					<div className="patient-details">
						<div className="d-flex align-items-center justify-content-between">
							<div>
								<div className="fs-md-14 grey-text fw-600">
									{capitalizeFirstLetter(bookingDetails?.buyer?.username)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<textarea
					value={text}
					// onKeyDown={(e) => {
					// 	if (e.key === "Enter" && isDataExists(text)) rescheuleRequest();
					// }}
					onChange={(e) => setText(e.target.value)}
					className="text-area py-3"
					placeholder="Write your customer a message "
					rows="5"></textarea>

				<div className="col-12 mt-3">
					<div className="d-flex align-itetms-center gap-2">
						<button
							onClick={() => {
								setBuyerModal(false);
								onCancelBooking("cancelled");
							}}
							className="primary-btn w-100 gap-3  ">
							<div className="">Cancel </div>

							<div className="fs-22">
								{" "}
								<iconify-icon icon="tabler:trash"></iconify-icon>
							</div>
						</button>

						<Button
							style={{ height: "52px" }}
							text="Reschedule"
							className="primary-btn w-100"
							hasImgRight="/assets/images/send-ic.svg"
							onClick={rescheuleRequest}
							validator={() => !!!text.trim()}
							isBusy={isSending}
						/>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default BuyerModal;
