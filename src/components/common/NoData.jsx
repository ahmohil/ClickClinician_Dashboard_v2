import React from "react";

const NoData = ({ message = "No Data Found!", isMinimal = true, extraClasses = "" }) => {
	return (
		<div className={` ${isMinimal ? "minimal-no-data" : "no-data"} `}>
			<div className={`${extraClasses}`}>{message}</div>
		</div>
	);
};

export default NoData;
