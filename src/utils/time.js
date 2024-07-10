import moment from "moment-timezone";

export const calculateHoursLeft = (startTime, userTimeZone) => {
	const startTimeMoment = moment(startTime);
	const currentTime = moment().tz(userTimeZone);
	return startTimeMoment.diff(currentTime, "hours");
};

export function isServiceCompleted(endTime, timeZone) {
	const currentTime = moment().tz(timeZone);
	const bookingEndTime = moment.tz(endTime, timeZone);

	if (currentTime.isBefore(bookingEndTime)) {
		return false;
	}
	return true;
}

export function isTimeLeft(startTime, timeZone) {
	try {
		const currentTime = moment().tz(timeZone);
		const bookingStartTime = moment.tz(startTime, timeZone);

		return currentTime.isBefore(bookingStartTime);
	} catch (error) {
		return false;
	}
}

export function formatTimeWithTimeZone(utcDateTime, timeZone) {
	if (!utcDateTime || !timeZone) {
	
		return null;
	}

	const localTime = moment.utc(utcDateTime).tz(timeZone);

	return localTime.format("MMM DD, YYYY");
}

export function formatTimeWithTimeZoneX(utcTime, timeZone) {
	const localDateTime = moment(utcTime).tz(timeZone);

	return localDateTime.format("hh:mm A");
}
