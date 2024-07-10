import { Link } from "react-router-dom";

const ServiceCardRow = ({ item }) => {
	return (
		<div className="list-card mb-4 h-card" key={item?.slug}>
			<div className="card-img">
				<img src={"/assets/images/listing.png"} className="w-100" alt="" />
				<a className="fav-ic">
					<span className="iconify" data-icon="mdi:heart-outline"></span>
				</a>
			</div>
			<div className="card-details">
				<div className="d-flex align-items-center justify-content-between">
					<div className="list-name">{item?.title}</div>
					<div className="rating">
						<img src="/assets/images/Star.svg" alt="" />
						<span>4.5</span>
					</div>
				</div>
				<div className="distance">4 Miles away</div>
				<div className="d-flex my-lg-3 my-2 flex-wrap justify-content-start gap-5">
					{item?.seller?.facebookId && (
						<div className="d-flex align-items-center gap-2">
							<img src="/assets/images/success.svg" alt="" />
							<span className="v-text">Facebook Verified</span>
						</div>
					)}
					{item?.seller?.isEmailVerified && (
						<div className="d-flex align-items-center gap-2">
							<img src="/assets/images/success.svg" alt="" />
							<span className="v-text">Email Verified</span>
						</div>
					)}
					{item?.seller?.isOtpVerified && (
						<div className="d-flex align-items-center gap-2">
							<img src="/assets/images/success.svg" alt="" />
							<span className="v-text">Phone Verified</span>
						</div>
					)}
				</div>
				<div className="d-flex align-items-center justify-content-between mb-lg-3">
					<div className="list-price">
						<span className="serif">${item?.price}</span>/hour
					</div>
					<div className="distance">Master Bed, Bath , Balcony</div>
				</div>
				<div className="d-flex align-items-center justify-content-between pt-lg-3 pb-2">
					<Link to={`/booking-details?service=${item.slug}`} className="list-link">
						More Details <img src="/assets/images/Right.svg" alt="" />
					</Link>
					<a className="chat-ic">
						<img src="/assets/images/message-square.svg" alt="" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default ServiceCardRow;
