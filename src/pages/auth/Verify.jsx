import { useState } from "react";
import OTPInput from "otp-input-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@components";
import { ResendOtp, VerifyOtp } from "@services";
import { successToaster, failureToaster, isDataExists } from "@utils";
import { userStore } from "@store";

const OTP_LENGTH = 6;

const otpInputStyle = {
	fontSize: "14px",
	margin: "4px",
	marginBottom: "20px",
	color: "black",
	fontWeight: 700,
	lineHeight: "24px",
	letterSpacing: "0.75px",
	width: "100%",
	borderRadius: "16px",
	background: "rgb(231, 242, 246)",
	height: "56px",
	padding: "6px 20px",
	border: "none",
};

const otpContainerStyle = {
	justifyContent: "center",
	marginTop: "20px",
};

const RESEND_OTP_MESSAGE = "Otp Sent To Your Phone Number!";
const SUCCESS_MESSAGE = "Otp Verified Successfully!";

export default function Verify() {
	const navigate = useNavigate();
	const location = useLocation();

	const UserStore = userStore((state) => state);

	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const resetStates = () => {
		setOtp("");
		setError("");
		setIsLoading(false);
	};

	const checkDisable = () => otp.length < OTP_LENGTH;

	const onResendOtp = async () => {
		setIsLoading(true);

		try {
			await ResendOtp(location.state.phone);
			successToaster(RESEND_OTP_MESSAGE);
			resetStates();
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
			setError(error.message);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const result = await VerifyOtp(otp, location.state.phone, location.state.type);
			successToaster(SUCCESS_MESSAGE);
			resetStates();
			if (location.state.type === "registration") {
				UserStore.setAuth(result);
				navigate("/");
			} else if (location.state.type === "reset-password") {
				const stateData = {
					resetPasswordToken: result.token,
					phone: location.state.phone,
				};
				navigate("/auth/set-password", { state: stateData });
			}
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
			setError(error.message);
			setOtp("");
		}
	};

	return (
		<div className="auth-bg d-md-flex">
			<div className="col-md-6 d-md-block d-none">
				<div className="auth-banner">
					<img src="/assets/images/auth-bg1.png" className="w-auto" alt="" />
				</div>
			</div>
			<div className="col-md-6">
				<div className="auth-form">
					<div className="auth-logo mb-3 pt-lg-5">
						<img src="/assets/images/logo.svg" alt="" />
					</div>
					<form className="form">
						<h2 className="mb-4">Verify Number</h2>

						<div className="d-flex gap-2 ">
							<OTPInput
								value={otp}
								onChange={setOtp}
								OTPLength={OTP_LENGTH}
								otpType="number"
								inputType="number"
								style={otpContainerStyle}
								disabled={false}
								inputStyles={otpInputStyle}
								shouldAutoFocus={true}
							/>
						</div>

						<div className="d-flex align-items-center justify-content-between mb-lg-4 mb-3">
							<p className="muted-text fs-16 mb-0">
								Please enter the verification code we sent to{" "}
								<span className="primary-text fw-600">{location.state.phone}</span>.
							</p>
						</div>

						{isDataExists(error) && <div className="server-error text-center mt-5 mb-4">{error}</div>}

						<Button
							text="Continue"
							onClick={(e) => !isLoading && onSubmit(e)}
							className="primary-btn w-100"
							hasIcon={true}
							hasImgRight="/assets/images/arrow.svg"
							validator={checkDisable}
							isLoading={isLoading}
						/>
					</form>
					<div className="auth-footer muted-text fs-14">
						Did not receive code?{" "}
						<a className="primary-text fw-600 pointer" onClick={() => !isLoading && onResendOtp()}>
							Resend
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
