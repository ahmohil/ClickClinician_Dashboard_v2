import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";
import { capitalizeFirstLetter } from "../transformers/TextFormation";
import { Button } from "../components";

const RescheduleModal = ({ rescheduleModal, setRescheduleModal, onConfirmReschedule }) => {
	return (
		<Modal
			show={rescheduleModal}
			size="md"
			onHide={() => {
				setCancelModal(false);
				setText("");
			}}
			centered
			className="elements-modal "
			backdrop="static">
			<Modal.Header className="fw-600 justify-content-center w-100">
				<div className="withdraw-img">
					<img src="/assets/images/rescheduling.png" alt="error" />
				</div>
			</Modal.Header>
			<Modal.Body className="">
				<div className="fs-16 fw-600 text-center">Do you really want to reschedule your booking?</div>

				<div className=" cancel-box ">
					<span className="fs-18 mt-1 ">
						<iconify-icon icon="fluent:info-24-filled"></iconify-icon>
					</span>
					You will be charged $5 as reschedule fee's{" "}
				</div>

				<div className="col-12 mt-3">
					<div className="d-flex align-items-center justify-content-end gap-2">
						<button
							onClick={() => {
								setRescheduleModal(false);
							}}
							className="primary-btn  gap-3 w-154  ">
							<div className="">No </div>
						</button>

						<button onClick={() => onConfirmReschedule()} className=" primary-btn gap-3 w-160  ">
							<div className="">Yes, Reschedule </div>
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default RescheduleModal;
