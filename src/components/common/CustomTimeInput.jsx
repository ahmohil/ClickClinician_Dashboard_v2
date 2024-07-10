import { useEffect, useState } from "react";
import Select from "react-select";
import {
	MidDayHoursArray,
	QuarterHourMinutesArray,
	TimeZonesArray,
	OneDayTimeOptions,
} from "../../constants/datePicker";
import { _12To24 } from "../../transformers/TimeFormatter";

const CustomTimeInput = ({ setTime, slotStartTime, text }) => {
	const [selectedTime, setSelectedTime] = useState([]);

	const handleOnTimeChange = (e, type) => {
		setSelectedTime(e);
	};

	useEffect(() => {
		setTime(selectedTime.value);
	}, [selectedTime]);

	return (
		<div className={`centered gap-2 custom-time-select bg-white `}>
			<Select
				options={OneDayTimeOptions}
				value={selectedTime}
				onChange={(e) => handleOnTimeChange(e, "StartHours")}
				isSearchable={true}
				classNamePrefix="timeSlot-select"
				placeholder={text}
				menuPlacement="auto"
				menuPosition="fixed"
			/>
		</div>
	);
};

export default CustomTimeInput;
