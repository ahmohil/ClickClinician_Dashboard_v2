import { useState } from "react";
import OTPInput from "otp-input-react";
import { ResendOtp, VerifyOtp } from "@services";
import { useNavigate } from "react-router-dom";
import { userStore } from "@store";
import { successToaster, failureToaster, isDataExists } from "@utils";
import { Button } from "@components";

const OTP_LENGTH = 6;

const otpInputStyle = {
	fontSize: "24px",
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

const SocialOtpVerification = ({ phone, discardUser }) => {
	const navigate = useNavigate();

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
			await ResendOtp(phone);
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
			const result = await VerifyOtp(otp, phone, "registration");
			successToaster(SUCCESS_MESSAGE);
			resetStates();
			discardUser();
			UserStore.setAuth(result);
			navigate("/");
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
			setError(error.message);
			setOtp("");
		}
	};

	return (
		<div className="otp-verification">
			<div className="d-flex gap-2">
				<OTPInput value={otp} onChange={setOtp} OTPLength={OTP_LENGTH} otpType="number" inputType="number" style={otpContainerStyle} inputStyles={otpInputStyle} shouldAutoFocus={true} />
			</div>

			<div className="d-flex align-items-center justify-content-between mb-lg-4 mb-3">
				<p className="muted-text fs-16 mb-0">Please enter the verification code we sent to your number.</p>
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

			<div className="auth-footer muted-text fs-14 mt-3">
				Did not receive code?{" "}
				<a className="primary-text fw-600 pointer" onClick={() => !isLoading && onResendOtp()}>
					Resend
				</a>
			</div>
		</div>
	);
};

export default SocialOtpVerification;
