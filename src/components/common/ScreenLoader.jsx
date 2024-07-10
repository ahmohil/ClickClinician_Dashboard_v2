import React from "react";
import Spinner from "react-bootstrap/Spinner";

const ScreenLoader = ({ message }) => {
	return (
		<div className="screen-loader">
			<Spinner animation="grow" />
			<div className="fs-18 fw-700 text-white spinner-text">{message}</div>
		</div>
	);
};

export default ScreenLoader;
