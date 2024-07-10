export function calculateMonthlyEarnings(totalTransactions) {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	const withdrawTransactions = totalTransactions?.filter((item) => {
		return (
			item.withDraw &&
			item.booking &&
			item.booking.bookingVerificationDate &&
			isSameMonth(item.booking.bookingVerificationDate, currentMonth, currentYear)
		);
	});

	// Calculate total earnings for the current month
	const totalMonthlyEarnings = withdrawTransactions?.reduce((total, transaction) => {
		return total + transaction.amount;
	}, 0);

	return totalMonthlyEarnings;
}

export function getMonthlySales(totalTransactions) {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	const withdrawTransactions = totalTransactions?.filter((item) => {
		return isSameMonth(item.updatedAt, currentMonth, currentYear);
	});

	// Calculate total earnings for the current month
	const totalMonthlyEarnings = withdrawTransactions?.reduce((total, transaction) => {
		return total + transaction.amount;
	}, 0);

	return totalMonthlyEarnings;
}

function isSameMonth(date, month, year) {
	const d = new Date(date);
	return d.getMonth() + 1 === month && d.getFullYear() === year;
}

export function calculateAvailableBalance(totalTransactions) {
	const withdrawTransactions = totalTransactions.filter((item) => {
		return (
			!item.withDraw &&
			item.booking &&
			item.booking.sellerCompletionDate &&
			isOneDayPassed(item.booking.sellerCompletionDate)
		);
	});

	const totalAvailableBalance = withdrawTransactions.reduce((total, transaction) => {
		return total + transaction.amount;
	}, 0);

	return totalAvailableBalance;
}

export const isThreeDaysPassed = (updatedAt) => {
	const updatedDate = new Date(updatedAt);

	const currentDate = new Date();

	const differenceInMs = currentDate - updatedDate;

	const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

	return differenceInDays >= 3;
};

export const isOneDayPassed = (updatedAt) => {
	const updatedDate = new Date(updatedAt);

	const currentDate = new Date();

	const differenceInMs = currentDate - updatedDate;

	const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

	return differenceInDays >= 1;
};

export const isThreeMinutesPassed = (updatedAt) => {
	const updatedDate = new Date(updatedAt);

	const currentDate = new Date();

	const differenceInMs = currentDate - updatedDate;

	const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

	return differenceInDays >= 3;
};

const extractServiceFee = (price) => {
	const percentageFee = price * 0.029;
	const totalFee = percentageFee + 0.3;

	const roundedFee = Math.ceil(totalFee * 100) / 100;

	const serviceFee = parseFloat(roundedFee.toFixed(2));

	const remainingAmount = price - serviceFee;

	return remainingAmount.toFixed(2);
};

export function generateServiceFee(price, futureSlots) {
	let totalFee = 0;

	if (futureSlots && futureSlots.length > 0) {
		futureSlots.forEach((slot) => {
			totalFee += +slot.price * +slot.seats;
		});
	}

	let totalBookingPrice = totalFee + price;

	let percentageFee = totalBookingPrice * 0.029;

	percentageFee += 0.3;

	const roundedFee = Math.ceil(percentageFee * 20) / 20;

	return roundedFee.toFixed(2);
}
