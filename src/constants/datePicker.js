import { getYear } from "date-fns";
import { range } from "lodash";

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const years = range(getYear(new Date()) - 100, getYear(new Date()) - 7).reverse();
// export const years = range(getYear(new Date()), getYear(new Date()) - 7).reverse();

export const monthOptions = months.map((month) => ({
	label: month,
	value: month,
}));

export const yearOptions = years.map((year) => ({
	label: year,
	value: year,
}));

export const WeekDays = [
	{
		label: "Sunday",
		value: 0,
	},
	{
		label: "Monday",
		value: 1,
	},
	{
		label: "Tuesday",
		value: 2,
	},
	{
		label: "Wednesday",
		value: 3,
	},
	{
		label: "Thursday",
		value: 4,
	},
	{
		label: "Friday",
		value: 5,
	},
	{
		label: "Saturday",
		value: 6,
	},
];

export const SmallWeekDays = [
	{
		label: "Sun",
		value: 0,
	},
	{
		label: "Mon",
		value: 1,
	},
	{
		label: "Tue",
		value: 2,
	},
	{
		label: "Wed",
		value: 3,
	},
	{
		label: "Thu",
		value: 4,
	},
	{
		label: "Fri",
		value: 5,
	},
	{
		label: "Sat",
		value: 6,
	},
];

export const FullDayHours = [
	{ label: "12:00 AM", value: "00:00" },
	{ label: "01:00 AM", value: "01:00" },
	{ label: "02:00 AM", value: "02:00" },
	{ label: "03:00 AM", value: "03:00" },
	{ label: "04:00 AM", value: "04:00" },
	{ label: "05:00 AM", value: "05:00" },
	{ label: "06:00 AM", value: "06:00" },
	{ label: "07:00 AM", value: "07:00" },
	{ label: "08:00 AM", value: "08:00" },
	{ label: "09:00 AM", value: "09:00" },
	{ label: "10:00 AM", value: "10:00" },
	{ label: "11:00 AM", value: "11:00" },
	{ label: "12:00 PM", value: "12:00" },
	{ label: "01:00 PM", value: "13:00" },
	{ label: "02:00 PM", value: "14:00" },
	{ label: "03:00 PM", value: "15:00" },
	{ label: "04:00 PM", value: "16:00" },
	{ label: "05:00 PM", value: "17:00" },
	{ label: "06:00 PM", value: "18:00" },
	{ label: "07:00 PM", value: "19:00" },
	{ label: "08:00 PM", value: "20:00" },
	{ label: "09:00 PM", value: "21:00" },
	{ label: "10:00 PM", value: "22:00" },
	{ label: "11:00 PM", value: "23:00" },
];

export const MidDayHoursArray = [
	{
		label: 1,
		value: "01",
	},
	{
		label: 2,
		value: "02",
	},
	{
		label: 3,
		value: "03",
	},
	{
		label: 4,
		value: "04",
	},
	{
		label: 5,
		value: "05",
	},
	{
		label: 6,
		value: "06",
	},
	{
		label: 7,
		value: "07",
	},
	{
		label: 8,
		value: "08",
	},
	{
		label: 9,
		value: "09",
	},
	{
		label: 10,
		value: "10",
	},
	{
		label: 11,
		value: "11",
	},
	{
		label: 12,
		value: "12",
	},
];

export const QuarterHourMinutesArray = [
	{
		label: "00",
		value: "00",
	},
	{
		label: "15",
		value: "15",
	},
	{
		label: "30",
		value: "30",
	},
	{
		label: "45",
		value: "45",
	},
];

export const TimeZonesArray = [
	{
		label: "AM",
		value: "AM",
	},
	{
		label: "PM",
		value: "PM",
	},
];

export const OneDayTimeOptions = [
	{ label: "12:00 AM", value: "00:00" },
	{ label: "12:15 AM", value: "00:15" },
	{ label: "12:30 AM", value: "00:30" },
	{ label: "12:45 AM", value: "00:45" },
	{ label: "1:00 AM", value: "01:00" },
	{ label: "1:15 AM", value: "01:15" },
	{ label: "1:30 AM", value: "01:30" },
	{ label: "1:45 AM", value: "01:45" },
	{ label: "2:00 AM", value: "02:00" },
	{ label: "2:15 AM", value: "02:15" },
	{ label: "2:30 AM", value: "02:30" },
	{ label: "2:45 AM", value: "02:45" },
	{ label: "3:00 AM", value: "03:00" },
	{ label: "3:15 AM", value: "03:15" },
	{ label: "3:30 AM", value: "03:30" },
	{ label: "3:45 AM", value: "03:45" },
	{ label: "4:00 AM", value: "04:00" },
	{ label: "4:15 AM", value: "04:15" },
	{ label: "4:30 AM", value: "04:30" },
	{ label: "4:45 AM", value: "04:45" },
	{ label: "5:00 AM", value: "05:00" },
	{ label: "5:15 AM", value: "05:15" },
	{ label: "5:30 AM", value: "05:30" },
	{ label: "5:45 AM", value: "05:45" },
	{ label: "6:00 AM", value: "06:00" },
	{ label: "6:15 AM", value: "06:15" },
	{ label: "6:30 AM", value: "06:30" },
	{ label: "6:45 AM", value: "06:45" },
	{ label: "7:00 AM", value: "07:00" },
	{ label: "7:15 AM", value: "07:15" },
	{ label: "7:30 AM", value: "07:30" },
	{ label: "7:45 AM", value: "07:45" },
	{ label: "8:00 AM", value: "08:00" },
	{ label: "8:15 AM", value: "08:15" },
	{ label: "8:30 AM", value: "08:30" },
	{ label: "8:45 AM", value: "08:45" },
	{ label: "9:00 AM", value: "09:00" },
	{ label: "9:15 AM", value: "09:15" },
	{ label: "9:30 AM", value: "09:30" },
	{ label: "9:45 AM", value: "09:45" },
	{ label: "10:00 AM", value: "10:00" },
	{ label: "10:15 AM", value: "10:15" },
	{ label: "10:30 AM", value: "10:30" },
	{ label: "10:45 AM", value: "10:45" },
	{ label: "11:00 AM", value: "11:00" },
	{ label: "11:15 AM", value: "11:15" },
	{ label: "11:30 AM", value: "11:30" },
	{ label: "11:45 AM", value: "11:45" },
	{ label: "12:00 PM", value: "12:00" },
	{ label: "12:15 PM", value: "12:15" },
	{ label: "12:30 PM", value: "12:30" },
	{ label: "12:45 PM", value: "12:45" },
	{ label: "1:00 PM", value: "13:00" },
	{ label: "1:15 PM", value: "13:15" },
	{ label: "1:30 PM", value: "13:30" },
	{ label: "1:45 PM", value: "13:45" },
	{ label: "2:00 PM", value: "14:00" },
	{ label: "2:15 PM", value: "14:15" },
	{ label: "2:30 PM", value: "14:30" },
	{ label: "2:45 PM", value: "14:45" },
	{ label: "3:00 PM", value: "15:00" },
	{ label: "3:15 PM", value: "15:15" },
	{ label: "3:30 PM", value: "15:30" },
	{ label: "3:45 PM", value: "15:45" },
	{ label: "4:00 PM", value: "16:00" },
	{ label: "4:15 PM", value: "16:15" },
	{ label: "4:30 PM", value: "16:30" },
	{ label: "4:45 PM", value: "16:45" },
	{ label: "5:00 PM", value: "17:00" },
	{ label: "5:15 PM", value: "17:15" },
	{ label: "5:30 PM", value: "17:30" },
	{ label: "5:45 PM", value: "17:45" },
	{ label: "6:00 PM", value: "18:00" },
	{ label: "6:15 PM", value: "18:15" },
	{ label: "6:30 PM", value: "18:30" },
	{ label: "6:45 PM", value: "18:45" },
	{ label: "7:00 PM", value: "19:00" },
	{ label: "7:15 PM", value: "19:15" },
	{ label: "7:30 PM", value: "19:30" },
	{ label: "7:45 PM", value: "19:45" },
	{ label: "8:00 PM", value: "20:00" },
	{ label: "8:15 PM", value: "20:15" },
	{ label: "8:30 PM", value: "20:30" },
	{ label: "8:45 PM", value: "20:45" },
	{ label: "9:00 PM", value: "21:00" },
	{ label: "9:15 PM", value: "21:15" },
	{ label: "9:30 PM", value: "21:30" },
	{ label: "9:45 PM", value: "21:45" },
	{ label: "10:00 PM", value: "22:00" },
	{ label: "10:15 PM", value: "22:15" },
	{ label: "10:30 PM", value: "22:30" },
	{ label: "10:45 PM", value: "22:45" },
	{ label: "11:00 PM", value: "23:00" },
	{ label: "11:15 PM", value: "23:15" },
	{ label: "11:30 PM", value: "23:30" },
	{ label: "11:45 PM", value: "23:45" },
	{ label: "11:59 PM", value: "23:59" },
];
