import React from "react";

const generateStars = (ratings) => {
	const stars = [];

	if (Array.isArray(ratings) && ratings.length > 0) {
		const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

		for (let i = 0; i < averageRating; i++) {
			stars.push(
				<span key={i}>
					<img src="/assets/images/Star.svg" alt="Star" />
				</span>
			);
		}
	} else if (typeof ratings === "number") {
		for (let i = 0; i < ratings; i++) {
			stars.push(
				<span key={i}>
					<img src="/assets/images/Star.svg" alt="Star" />
				</span>
			);
		}
	}

	return stars;
};

export default generateStars;
