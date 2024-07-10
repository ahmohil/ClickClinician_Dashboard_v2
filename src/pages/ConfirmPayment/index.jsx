import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@components";

const ConfirmPay = () => {
	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);
	return (
		<div className="container">
			<div className="row my-lg-3 mb-lg-5">
				<div className="col-md-7 mb-lg-0 mb-4">
					<div className="d-flex align-items-center justify-content-between mb-lg-2">
						<div className="fs-md-24 fw-700">Confirm and pay</div>
					</div>
					<div className="light-text fs-md-18 fw-600">Master Bed, Bath , Balcony</div>

					<div className="bb-1 py-2"></div>
					<div className="pro-stats justify-content-between mt-3">
						<div className="py-2">
							<div className="fs-md-18 gray-text fw-600 mb-1">September 7, 2023</div>
							<div className="fs-md-14 fw-600 muted-text">10:00 AM - 11:00 AM</div>
						</div>
						<a className="pointer">
							<img src="/assets/images/edit-ic.svg" alt="" />{" "}
						</a>
					</div>
					<div className="bb-1 py-2"></div>
					<div className="pro-stats justify-content-between mt-3">
						<div className="py-2">
							<div className="fs-md-18 gray-text fw-600 mb-1">Members</div>
							<div className="fs-md-14 fw-600 muted-text">5 Members</div>
						</div>
						<a className="pointer">
							<img src="/assets/images/edit-ic.svg" alt="" />{" "}
						</a>
					</div>
					<div className="bb-1 py-2"></div>
					<div className="d-flex align-items-center justify-content-between mt-3 mb-lg-2">
						<div className="fs-md-24 fw-700">Pay with</div>
					</div>
					<div className="light-text fs-md-18 fw-600">Payment method</div>

					<div className="row mt-4">
						<div className="col-4">
							<Button text="Credit Card" className="pay-btn active w-100 mb-2" hasIcon={true} hasImgLeft="/assets/images/Mastercard.svg" />
						</div>
						<div className="col-4">
							<Button text="Paypal" className="pay-btn w-100 mb-2" hasIcon={true} hasImgLeft="/assets/images/paypal.svg" />
						</div>
						<div className="col-4">
							<Button text="Google Pay" className="pay-btn w-100 mb-2" hasIcon={true} hasImgLeft="/assets/images/g-pay.svg" />
						</div>
					</div>
					<div className="bb-1 py-lg-3 py-2"></div>
					<div className="pro-stats mt-3 mt-lg-4">
						<div className="col-12 text-md-start text-center py-2">
							<div className="fs-md-18 gray-text fw-600 mb-3">Cancellation policy</div>
							<div className="d-flex alifn-items-center gap-2 mb-2">
								<img src="/assets/images/success.svg" height={22} alt="" />
								<span className="fs-md-14 mb-2">
									Get a full refund if you cancel before <span className="fw-600">8:00 AM on September 07, 2023</span> .
								</span>
							</div>
							<div className="d-flex alifn-items-center gap-2">
								<img src="/assets/images/success.svg" height={22} alt="" />
								<span className="fs-md-14">Request to reschedule with your host at any time!</span>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-5">
					<div className="card-box mb-4">
						<div className="list-card h-card border-0">
							<div className="card-img h-150 w-200">
								<img src="/assets/images/listing.png" className="w-100" alt="" />
							</div>
							<div className="card-details">
								<div className="d-flex align-items-center justify-content-between">
									<div className="list-name">1 Roomate Required</div>
								</div>

								<div className="d-flex align-items-center justify-content-between mb-lg-3">
									<div className="distance">Master Bed, Bath , Balcony</div>
								</div>
								<div className="rating">
									<img src="/assets/images/Star.svg" alt="" />
									<span>4 .5 Ratings</span>
								</div>
							</div>
						</div>
						<div className="bb-1 py-lg-3 py-2"></div>
						<div className="row mt-3">
							<div className="col-12 mb-3">
								<div className="fs-md-18 gray-text fw-600">Price details</div>
							</div>
							<div className="col-6">
								<div className="fs-md-14 muted-text fw-600">1 hour booking</div>
							</div>
							<div className="col-6">
								<div className="fs-md-14 fw-600 text-end">$50.00</div>
							</div>
							<div className="col-md-12 mb-3">
								<div className="bb-1 py-2"></div>
							</div>

							<div className="col-6">
								<div className="fs-md-14 muted-text fw-600">Service fee</div>
							</div>
							<div className="col-6">
								<div className="fs-md-14 fw-600 text-end">$3.00</div>
							</div>
							<div className="col-md-12 mb-3">
								<div className="bb-1 py-2"></div>
							</div>

							<div className="col-6">
								<div className="fs-md-14 fw-600">Total</div>
							</div>
							<div className="col-6">
								<div className="fs-md-14 fw-600 text-end">$53.00</div>
							</div>
						</div>
					</div>

					<div className="col-md-12 pt-lg-3">
						<label htmlFor="" className="d-block fs-14 fw-600 mb-2">
							Coupon Code
						</label>
						<div className="input-with-ic">
							<Input type="number" placeholder="Insert Code" style={{}} className="form-input" iconImg="tabler:ticket" />
						</div>
					</div>
					<div className="col-md-12 mt-3 mt-lg-4">
						<Button style={{ height: "52px" }} text="Confirm and Pay" onClick={() => navigate("/review")} className="primary-btn w-100" hasImgRight="/assets/images/cash.svg" />
						<p className="fs-md-14 mt-3 muted-text">
							By clicking &quot;Confirm and Pay&quot; you agree to the
							<a className="pointerdefault-text fw-600"> Terms and Conditions</a>. You also agree to pay the total amount shown, which includes taxes and fees.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmPay;
