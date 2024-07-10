import { Intervals } from "./constants";
import moment from "moment-timezone";

export const TimeFormatter = (value) => {
	if (!value) return "";

	let timeFormat = {
		hour: "2-digit",
		minute: "2-digit",
		isAfter12: false,
	};

	let time = value.split(":");

	let hour = Number(time[0]);
	if (hour < 12) {
		timeFormat.isAfter12 = false;
		timeFormat.hour = hour === 0 ? 12 : hour; // If hour is 0, set it to 12
	} else {
		timeFormat.isAfter12 = true;
		timeFormat.hour = hour === 12 ? 12 : hour % 12; // If hour is 12, keep it as 12
	}

	timeFormat.hour = timeFormat.hour?.toString().padStart(2, "0");
	timeFormat.minute = time[1]?.toString().padStart(2, "0");

	return `${timeFormat.hour}:${timeFormat.minute} ${timeFormat.isAfter12 ? "PM" : "AM"}`;
};

export const _12To24 = (time, type) => {
	let value = time.split(" ");

	if (value[1] === "PM") {
		if (value[0].split(":")[0] === "12") return `${value[0].split(":")[0]}:${value[0].split(":")[1]}`;

		if (type === "home") {
			return `${+value[0].split(":")[0]}:${value[0].split(":")[1]}`;
		} else return `${12 + +value[0].split(":")[0]}:${value[0].split(":")[1]}`;
	} else {
		if (value[0].split(":")[0] === "12") return `00:${value[0].split(":")[1]}`;
		else return value[0];
	}
};

export const timesAgoFromTime = (value) => {
	if (!value) return "";

	const [hours, minutes] = value.split(":");
	const date = new Date();
	date.setHours(hours, minutes);

	const diffMinutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);

	if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
	if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
	return `${Math.floor(diffMinutes / 1440)} days ago`;
};

export const timesAgoFromDate = (value) => {
	if (!value) return "";

	const date = new Date(value);

	const diffMinutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);

	if (diffMinutes < 1) return `Just now`;
	if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
	if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hour ago`;
	return `${Math.floor(diffMinutes / 1440)} days ago`;
};

export const convertTo24HourFormat = (time) => {
	const [timeStr, period] = time.split(" "); // Split the time string into time and period (AM/PM)
	const [hour, minute] = timeStr.split(":").map(Number); // Extract hour and minute

	let hour24 = hour; // Initialize hour in 24-hour format

	// If the period is PM and hour is not 12, add 12 to convert to 24-hour format
	if (period === "PM" && hour !== 12) {
		hour24 += 12;
	}

	// If the period is AM and hour is 12, set hour to 0 in 24-hour format
	if (period === "AM" && hour === 12) {
		hour24 = 0;
	}

	// Format the hour and minute to HH:mm format
	const formattedHour = String(hour24).padStart(2, "0");
	const formattedMinute = String(minute).padStart(2, "0");

	// Return the time in 24-hour format without time zone
	return `${formattedHour}:${formattedMinute}`;
};

export const QueryFormattedDate = (date) => {
	const newDate = new Date(date).toISOString().split("T")[0];

	const [year, month, day] = newDate.split("-");

	return `${year?.toString().padStart(4, "0")}-${month?.toString().padStart(2, "0")}-${day
		?.toString()
		.padStart(2, "0")}`;
};

export const formatDateX = (date) => {
	const year = date?.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export const formatMomentDate = (dateString) => {
	return moment(dateString).format("MMM D, YYYY");
};

export const daysAgo = (dateString) => {
	const currentDate = new Date();
	const inputDate = new Date(dateString);
	const timeDifference = currentDate - inputDate;

	const intervals = Intervals;

	for (const { label, value } of intervals) {
		const unitCount = Math.floor(timeDifference / value);
		if (unitCount > 0) return unitCount === 1 ? `1 ${label} ago` : `${unitCount} ${label}s ago`;
	}

	return "just now";
};

export const getCurrentTime = () => {
	const currentDate = new Date();

	// Format the time as hh:mm AM/PM
	const hours = currentDate.getHours() % 12 || 12;
	const minutes = currentDate.getMinutes();
	const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";
	const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

	// Format the date as Thur 25 Jan
	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
	const dayOfWeek = daysOfWeek[currentDate.getDay()];
	const day = currentDate.getDate();
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = months[currentDate.getMonth()];
	const formattedDate = `${dayOfWeek} ${day} ${month}`;

	return {
		currentTime: formattedTime,
		currentDate: formattedDate,
	};
};

export const createTimeDateIsoString = (timeString, date, userTimeZone) => {
	const dateTimeString = `${date} ${timeString}`;

	const localDateTime = moment.tz(dateTimeString, "YYYY-MM-DD HH:mm", userTimeZone.value);

	const userTimeZoneOffset = moment.tz.zone(userTimeZone.value).utcOffset(localDateTime);

	const utcDateTime = localDateTime.utcOffset(userTimeZoneOffset);

	return utcDateTime.toISOString();
};

export const adjustEndTime = (startTimeISO, endTimeISO) => {
	const startTime = moment(startTimeISO);
	const endTime = moment(endTimeISO);

	if (endTime.isBefore(startTime)) {
		return endTime.add(1, "days").toISOString();
	} else {
		return endTimeISO;
	}
};

export const extractDate = (isoDateTime) => {
	const dateObj = new Date(isoDateTime);

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export const extractAndAdjustTime = (isoDateTime, timeZone) => {
	// Extract the base time from the ISO string
	const baseTime = moment(isoDateTime);

	// Convert the time to the specified time zone
	const convertedTime = baseTime.tz(timeZone);

	// Format the time part as "hh:mm A" for 12-hour format with AM/PM
	return convertedTime.format("hh:mm A");
};

export const formatTimeForBooking = (isoDateTime) => {
	const [datePart, timePart] = isoDateTime.split("T");
	const [hours, minutes] = timePart.slice(0, -5).split(":"); // Extract hours and minutes
	return `${hours}:${minutes}`; // Return time in 24-hour format
};
