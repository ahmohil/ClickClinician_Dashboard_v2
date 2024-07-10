import { Fragment, useEffect, useState } from "react";
import { DateFormatter, QueryFormattedDate } from "@transformers";
import { WeekDays, SmallWeekDays } from "@constants";

const defaultWeekFormat = SmallWeekDays.map((item) => ({
	...item,
	date: null,
}));

const WeekDaySelector = ({ setOutput, type }) => {
	const [currentWeek, setCurrentWeek] = useState(defaultWeekFormat);

	const [selectedDate, setSelectedDate] = useState(new Date());

	const onChangeDate = (date) => {
		setSelectedDate(date);
	};

	const previousWeek = () => {
		if (!!currentWeek) {
			const previousWeek = currentWeek.map((item) => {
				const date = new Date(item.date);
				date.setDate(date.getDate() - 7);
				return {
					...item,
					date,
				};
			});

			setCurrentWeek(previousWeek);

			if (previousWeek[0]?.date.getTime() < new Date().getTime()) setSelectedDate(new Date());
			else setSelectedDate(previousWeek[0]?.date);
		}
	};

	const nextWeek = () => {
		if (!!currentWeek) {
			const nextWeek = currentWeek.map((item) => {
				const date = new Date(item.date);
				date.setDate(date.getDate() + 7);
				return {
					...item,
					date,
				};
			});

			setCurrentWeek(nextWeek);

			if (nextWeek[0]?.date.getTime() < new Date().getTime()) setSelectedDate(new Date());
			else setSelectedDate(nextWeek[0]?.date);
		}
	};

	useEffect(() => {
		setOutput(selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		if (!!selectedDate) {
			const currentDay = selectedDate.getDay();

			const week = currentWeek.map((item, index) => {
				const date = new Date(selectedDate);

				date.setDate(selectedDate.getDate() + index - currentDay);

				return { ...item, date };
			});

			setCurrentWeek(week);
		}
	}, []);

	return (
		<Fragment>
			<div className="d-flex justify-content-center">
				<div className="d-flex align-items-center gap-3">
					<div className="left-circle pointer" onClick={previousWeek}>
						<img src="/assets/images/left-circle.svg" alt="circle" />
					</div>
					<div className="gray-text fs-md-24 fw-700">{DateFormatter(selectedDate, "short")}</div>
					<div className="left-circle pointer" onClick={nextWeek}>
						<img src="/assets/images/right-circle.svg" alt="circle" />
					</div>
				</div>
			</div>
			<div className="container mt-3 p-0">
				<div className="d-flex ">
					{currentWeek.map((item, i) => (
						<Fragment key={item.date ?? i}>
							{!!item.date && (
								<div
									className={`date-boxes flex-1 flex-wrap pointer ${
										QueryFormattedDate(selectedDate) === QueryFormattedDate(item.date) ? "active" : ""
									}  ${QueryFormattedDate(item.date) < QueryFormattedDate(new Date()) ? "disabled" : ""}`}
									key={item.date}
									onClick={() => onChangeDate(item.date)}>
									<div className="fs-md-20 gray-text mb-1 fw-600">{item.label}</div>
									<div className="fs-md-16 fw-600 date">{DateFormatter(item.date, "mmdd")}</div>
								</div>
							)}
						</Fragment>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default WeekDaySelector;
