import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";
import { capitalizeFirstLetter } from "../transformers/TextFormation";
import { Button } from "../components";

const CancelModal = ({
	cancelModal,
	setCancelModal,
	isSending,

	onCancelConfirmBooking,
}) => {
	return (
		<Modal
			show={cancelModal}
			size="md"
			onHide={() => {
				setCancelModal(false);
				setText("");
			}}
			centered
			className="elements-modal "
			backdrop="static">
			<Modal.Header className="fw-600 justify-content-center w-100">
				<div className="withdraw-img fs-28 mt-3 mb-3">
					<iconify-icon icon="icomoon-free:bin"></iconify-icon>
				</div>
			</Modal.Header>
			<Modal.Body className="">
				<div className="fs-16 fw-600 text-center">Do you really want to cancel your booking?</div>

				<div className=" cancel-box ">
					<span className="fs-18">
						<iconify-icon icon="fluent:info-24-filled"></iconify-icon>
					</span>
					You will be charged a cancellation fee of $5, which will be deducted from your wallet{" "}
				</div>

				<div className="col-12 mt-3">
					<div className="d-flex align-items-center justify-content-end gap-2">
						<button
							onClick={() => {
								setCancelModal(false);
							}}
							className="primary-btn  gap-3 w-154  ">
							<div className="">No </div>
						</button>

						<button onClick={() => onCancelConfirmBooking("cancelled")} className=" no-btn gap-3 w-154  ">
							<div className="">Yes, Cancel </div>
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default CancelModal;
