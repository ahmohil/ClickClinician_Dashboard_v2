import Modal from "react-bootstrap/Modal";

const DeductAmountModal = ({
	viewModal,
	setViewModal,
	wallet,
	selectedTransaction,
	remainingAmount,
	confirmWithDraw,
}) => {
	return (
		<Modal
			show={viewModal}
			size="md"
			onHide={() => setViewModal(false)}
			centered
			className="elements-modal  withdrw-modal"
			backdrop="static">
			<Modal.Header className="fw-600 justify-content-center" closeButton>
				<div className="withdraw-img centered">
					<img src="/assets/images/error-alert.png" alt="error" />
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="px-5 mb-3">
					<div className="">The charged amount is deducted from your earnings</div>

					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<span className=" fs-md-16  fw-600">Payable Amount: </span>
						<div className="fs-16">${wallet?.chargedAmount}</div>
					</div>
					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<span className="  fs-md-16  fw-600">Withdraw Request: </span>
						<div className="fs-16">${selectedTransaction?.amount}</div>
					</div>

					<div className="d-flex align-items-center justify-content-between fs-20 mt-3 ">
						<span className=" fs-md-16  fw-600">Final Amount: </span>
						{remainingAmount == 0 && <>${remainingAmount}</>}
						{remainingAmount > 0 && <>${remainingAmount}</>}
						{remainingAmount < 0 && <div className="fs-16">-${Math.abs(remainingAmount)}</div>}
					</div>
				</div>

				<div className="col-12 mt-4">
					<div className=" d-flex align-items-center  justify-content-center gap-2 ">
						<button onClick={() => setViewModal(false)} className="primary-btn inline-flex gap-3  w-154  mt-2 mt-lg-0">
							<div className="">Close</div>
						</button>

						<button onClick={() => confirmWithDraw()} className="primary-btn w-154   gap-3  mt-2 mt-lg-0">
							<div className="">Confirm </div>
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default DeductAmountModal;
