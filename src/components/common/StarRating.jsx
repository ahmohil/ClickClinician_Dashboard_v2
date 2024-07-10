import { isDataExists } from "@utils";

const StarRating = ({ stars, rating, setRating, hoverRating, setHoverRating }) => {
	const handleStarClick = (value) => {
		setRating(value);
	};

	const handleStarHover = (value) => {
		setHoverRating(value);
	};

	const handleStarLeave = () => {
		setHoverRating(0);
	};

	return (
		<>
			<div className="d-flex gap-3 justify-content-end fs-38">
				{stars.map((star, index) => (
					<div
						className="starBox"
						key={index}
						onClick={() => handleStarClick(star)}
						onMouseOver={() => handleStarHover(star)}
						onMouseLeave={handleStarLeave}
						style={{
							cursor: "pointer",
							color: star <= (isDataExists(hoverRating) ? hoverRating : rating) ? "#e2a21f" : "grey",
						}}>
						&#9733;
					</div>
				))}
			</div>
		</>
	);
};

export default StarRating;
