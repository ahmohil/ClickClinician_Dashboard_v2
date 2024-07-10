import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { failureToaster, successToaster, isDataExists } from "@utils";
import StarRating from "../components/common/StarRating";
import { capitalizeFirstLetter } from "../transformers/TextFormation";
import { Button } from "../components";
import DatePicker from "react-datepicker";
import { QueryFormattedDate } from "../transformers/TimeFormatter";

const CalendarModal = ({
	show,
	setShow,
	selectedDate,
	endDate,
	setEndDate,

	checkDeadlineDate,
}) => {
	return (
		<Modal
			show={show}
			onHide={() => setShow(false)}
			centered
			animation={true}
			backdrop="static"
			className="review-modal weekly-slot-modal">
			<Modal.Header className="border-0">
				<Modal.Title>
					<div className="fs-md-24 fw-600">Choose recurring end date </div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="form-row">
					<div className="col-12 mb-2 fs-16">For weekly recurring slots, you must enter the end date.</div>
					<div className="col-12 mb-4 mt-4">
						<div className="row justify-content-between">
							<div className=" align-self-center">
								<label htmlFor="review" className="mb-3 fs-20 fw-600">
									Select recurring end date
								</label>
							</div>
							<div className="col-md-8">
								<div className="text-center"></div>
							</div>
						</div>

						<div className="booking-time dashboard-time position-relative">
							<DatePicker inline selected={endDate} onChange={(date) => setEndDate(date)} minDate={new Date()} />
						</div>
					</div>
					<div className="col-12 my-4">
						<div className="form-group"></div>
					</div>
					<div className="d-flex align-items-center justify-content-center gap-2">
						<div className="col-6">
							<button
								type="button"
								onClick={() => {
									setEndDate(new Date(selectedDate));
									setShow(false);
								}}
								className="primary-btn w-100">
								Close
							</button>
						</div>

						<div className="col-6">
							<button
								type="button"
								disabled={QueryFormattedDate(selectedDate) === QueryFormattedDate(endDate)}
								onClick={() => checkDeadlineDate()}
								className="primary-btn w-100 ">
								Save
								<span className="fs-14 mt-1">
									<iconify-icon icon="tdesign:save"></iconify-icon>
								</span>
							</button>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default CalendarModal;
