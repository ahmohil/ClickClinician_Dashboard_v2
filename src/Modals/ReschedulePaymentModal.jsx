import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";
import { capitalizeFirstLetter } from "../transformers/TextFormation";
import { Button } from "../components";
import { formatDateForBooking } from "../transformers/DateFormatter";
import { TimeFormatter } from "../transformers/TimeFormatter";

const ReschedulePaymentModal = ({
	show,
	setShow,
	dataToShow,
	locationStatePrice,
	remainingAmount,
	amountStatus,
	rescheduleFee,
	onRescheduleBooking,
	locationStatePayable,
}) => {
	return (
		<Modal
			show={show}
			className="payment-pay"
			onHide={() => setShow(false)}
			dialogClassName="modal-card"
			size="md "
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static">
			<div className="p-box pb-3">
				<div className="d-flex mb-4 align-items-center justify-content-center">
					<div></div>
					<div className="payment-pay-logo text-center ">
						<img src="/assets/images/logo.png" alt="logo" />
					</div>
				</div>
				<div className="text-center fs-18 fw-700 mb-4 ">Reschedule Request</div>
				<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Session Date: </span>
					<div className="blue-clr fs-14">{formatDateForBooking(dataToShow?.date)} </div>
				</div>
				<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Session Start Time: </span>
					<div className="blue-clr fs-14">{TimeFormatter(dataToShow?.startTime)}</div>
				</div>
				<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Session End Time: </span>
					<div className="blue-clr fs-14">{TimeFormatter(dataToShow?.endTime)} </div>
				</div>
				<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Current Session Price:</span>
					<div className="blue-clr fs-14">${dataToShow?.price * dataToShow?.seats}</div>
				</div>
				<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
					<span className=" fs-16  fw-600">Previous Session Price: </span>
					<div className="blue-clr fs-14">${locationStatePrice} </div>
				</div>

				{remainingAmount < 0 && amountStatus == "return" && (
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<span className=" fs-16  fw-600">Return Amount: </span>
						<div className="blue-clr fs-14">${Math.abs(remainingAmount)} </div>
					</div>
				)}

				{locationStatePayable == "true" && (
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<span className=" fs-16  fw-600">Rescheduling Fee: </span>
						<div className="blue-clr fs-14">${rescheduleFee} </div>
					</div>
				)}

				{remainingAmount > 0 && (
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<span className=" fs-16  fw-600">Payable Amount: </span>
						<div className="blue-clr fs-14">
							${remainingAmount + locationStatePayable === "true" ? rescheduleFee : remainingAmount}
						</div>
					</div>
				)}

				{remainingAmount > 0 && locationStatePayable == "true" && (
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<div className="blue-clr fs-14 text-center fs-18 fw-500">
							You have to pay <span className="blue-clr default-text ">${remainingAmount + rescheduleFee}</span>
							for rescheduling new session{" "}
						</div>
					</div>
				)}
				{remainingAmount > 0 && locationStatePayable == "false" && (
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<div className="blue-clr fs-14 text-center fs-18 fw-500">
							You have to pay <span className="blue-clr default-text ">${remainingAmount}</span>
							for rescheduling new session{" "}
						</div>
					</div>
				)}

				{remainingAmount === 0 && locationStatePayable == "true" && (
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<div className="blue-clr fs-14 text-center fs-18 fw-500">
							You have to pay <span className="blue-clr default-text ">${rescheduleFee} </span> for rescheduling new
							session{" "}
						</div>
					</div>
				)}

				{remainingAmount < 0 && locationStatePayable == "true" && (
					<div className=" fs-20 mt-3 ">
						<div className="blue-clr fs-14 text-center fs-18 fw-500">
							<span className="blue-clr default-text text-center ">${-remainingAmount} </span>
							will transferred to your wallet and as per policy you have to pay{" "}
							<span className="blue-clr default-text text-center">${rescheduleFee} </span> for rescheduling new session
						</div>
					</div>
				)}

				{remainingAmount < 0 && locationStatePayable == "false" && (
					<div className=" fs-20 mt-3 ">
						<div className="blue-clr fs-14 text-center fs-18 fw-500">
							<span className="blue-clr default-text text-center ">${-remainingAmount} </span>
							will transferred to your wallet
						</div>
					</div>
				)}

				<div className="d-flex align-items-center justify-content-center gap-2 ">
					<button
						onClick={() => {
							setShow(false);
						}}
						className="primary-btn mt-3 ">
						Close
					</button>
					<button
						onClick={() => {
							onRescheduleBooking();
						}}
						className="primary-btn mt-3 ">
						{remainingAmount == 0 && locationStatePayable == "false" ? "Reschedule" : ""}
						{remainingAmount > 0 && locationStatePayable == "false" ? "Pay & Continue" : ""}
						{remainingAmount < 0 && locationStatePayable == "false" ? "Confirm & Continue" : ""}

						{remainingAmount == 0 && locationStatePayable == "true" ? "Pay & Continue" : ""}
						{remainingAmount > 0 && locationStatePayable == "true" ? "Pay & Continue" : ""}
						{remainingAmount < 0 && locationStatePayable == "true" ? "Confirm & Continue" : ""}
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ReschedulePaymentModal;
