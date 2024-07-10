import { useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { failureToaster, successToaster, isDataExists } from "@utils";
import { ForgotPassword } from "@services";
import { Button, CustomInput } from "@components";
import { PHONE_NUMBER_MIN_LENGTH, CountryCodes } from "@constants";

const SUCCESS_MESSAGE = "OTP Sent Successfully to your phone number.";

const defaultBody = { phone: "" };

const defaultValidationErrors = { phone: false };

const Forget = () => {
	const navigate = useNavigate();

	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [selectedCountryCode, setSelectedCountryCode] = useState(CountryCodes[0]);

	const onCountryCodeChange = (e) => setSelectedCountryCode(e);

	const resetStates = () => {
		setBody(defaultBody);
		setValidationErrors(defaultValidationErrors);
		setError("");
		setIsLoading(false);
		setIsFormSubmitted(false);
	};

	const checkValidation = () => {
		for (let field in body) if (body[field].length <= 0) return true;
		for (let field in validationErrors) if (validationErrors[field]) return true;

		return false;
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		setIsFormSubmitted(true);

		if (checkValidation()) return;
		if (isLoading) return;
		setIsLoading(true);

		try {
			const phone = `${selectedCountryCode.value}-${body.phone}`;
			await ForgotPassword(phone);
			resetStates();
			successToaster(SUCCESS_MESSAGE);
			navigate("/auth/otp", { state: { phone, type: "reset-password" } });
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
			setError(error.message);
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
					<div className="auth-logo pt-lg-5 mb-3">
						<img src="/assets/images/logo.svg" alt="" />
					</div>
					<form action="">
						<h2 className="mb-4">Reset Password</h2>
						<p>To reset your password, please enter your phone number below. We will send you an otp to reset your password.</p>

						<div className="mb-3 d-flex gap-3">
							<Select options={CountryCodes} className="country-select-container" value={selectedCountryCode} onChange={onCountryCodeChange} classNamePrefix="country-select" />
							<div className="w-100">
								<CustomInput
									placeholder="Phone Number"
									name="phone"
									setState={setBody}
									state={body}
									isRequired={true}
									serverError={error}
									setValidationsState={setValidationErrors}
									validationState={validationErrors}
									isFormSubmitted={isFormSubmitted}
									onPressEnter={onSubmit}
									extraClasses="auth-input"
									isNumericOnly={true}
									minLength={PHONE_NUMBER_MIN_LENGTH}
									setServerError={setError}
								/>
							</div>
						</div>

						{isDataExists(error) && <div className="server-error text-center mt-5 mb-4">{error}</div>}

						<Button text="Send" onClick={onSubmit} className="primary-btn w-100" hasIcon={true} hasImgRight="/assets/images/arrow.svg" isBusy={isLoading} />
					</form>
					<div className="auth-footer muted-text fs-14">
						Already have an Account?{" "}
						<Link to={"/auth"} className="primary-text fw-600">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Forget;
