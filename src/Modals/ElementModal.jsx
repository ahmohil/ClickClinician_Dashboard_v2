import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ElementModal = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<div>
			<Button variant="primary" onClick={handleShow}>
				Modal
			</Button>

			<Modal show={show} size="md" onHide={handleClose} centered className="elements-modal">
				<Modal.Header className="align-items-start p-0" closeButton>
					<Modal.Title className="element-img">
						<img src="/assets/images/auth-bg.png" alt="" />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h1 className="h-primary fs-28">You are in a new timezone</h1>
					<p className="fs-14">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sed, saepe assumenda ut beatae ad natus iusto,
						harum ipsum cum laudantium!
					</p>
				</Modal.Body>
				<Modal.Footer className="align-items-center">
					<button className="primary-btn w-100">Update to asia</button>
					<button className="primary-btn w-100">Stay with Asia</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ElementModal;
