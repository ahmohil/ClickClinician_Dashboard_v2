import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { CustomInput, Button } from "@components";
import { PHONE_NUMBER_MIN_LENGTH, CountryCodes } from "@constants";
import { CompleteProfile } from "@services";
import moment from "moment-timezone";

import { failureToaster } from "@utils";
import { isDataExists } from "@utils";
import SocialOtpVerification from "./SocialOtpVerification";

const defaultBody = {
	email: "",
	phone: "",
};

const defaultValidationErrors = {
	email: false,
	phone: false,
};

const PhoneNumberModal = ({ user, discardUser }) => {
	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [selectedCountryCode, setSelectedCountryCode] = useState(CountryCodes[0]);
	const [isOnVerification, setIsOnVerification] = useState(false);

	const onCountryCodeChange = (e) => setSelectedCountryCode(e);

	const checkValidation = () => {
		if (!!!body.phone) return true;
		if (!!user && !!user.facebookId && !!!body.email) return true;
		for (let field in validationErrors) if (validationErrors[field]) return true;

		return false;
	};

	const defaultTimeZone = moment.tz.guess();
	const offset = moment().tz(defaultTimeZone).utcOffset();

	const timeZone = {
		label: defaultTimeZone,
		value: defaultTimeZone,
		offset: offset,
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		setIsFormSubmitted(true);

		if (checkValidation()) return;

		setIsLoading(true);

		const payload = {
			...body,
			phone: `${selectedCountryCode.value}-${body.phone}`,
			timeZone: timeZone,
		};

		try {
			await CompleteProfile(payload, user);
			setIsOnVerification(true);
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
			setError(error.message);
		}
	};

	return (
		<div>
			<Modal show={user} onHide={discardUser} backdrop="static" className="details-modals" centered>
				<Modal.Header closeButton className="position-relative justify-content-center border-0">
					<Modal.Title>
						<div className="fs-14 fw-400 mx-auto">
							<img src="/assets/images/logo.svg" alt="logo" />
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="fs-28 fw-600">Welcome to SplitMart!</div>
					{!isOnVerification && (
						<div className="phone-number">
							<p>To continue with SplitMart , please enter your phone number below. We will send you an otp.</p>
							<div className="auth-bg d-flex align-items-center justify-content-between gap-2 mt-4 flex-column">
								<div className="mb-3 w-100 d-flex gap-3">
									<Select
										options={CountryCodes}
										className="country-select-container"
										value={selectedCountryCode}
										onChange={onCountryCodeChange}
										classNamePrefix="country-select"
									/>
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

								{!!user.facebookId && (
									<div className="mb-3 w-100">
										<CustomInput
											type="email"
											placeholder=""
											name="email"
											setState={setBody}
											state={body}
											isRequired={true}
											serverError={error}
											setValidationsState={setValidationErrors}
											validationState={validationErrors}
											isFormSubmitted={isFormSubmitted}
											onPressEnter={onSubmit}
											extraClasses="auth-input"
											setServerError={setError}
										/>
									</div>
								)}
							</div>

							<div className="mt-3">
								{isDataExists(error) && <div className="server-error text-center my-3">{error}</div>}

								<Button
									text="Continue"
									className="primary-btn w-100"
									hasIcon={true}
									hasImgRight="/assets/images/arrow.svg"
									isBusy={isLoading}
									onClick={onSubmit}
								/>
							</div>
						</div>
					)}
					{isOnVerification && (
						<SocialOtpVerification phone={`${selectedCountryCode.value}-${body.phone}`} discardUser={discardUser} />
					)}
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
};

export default PhoneNumberModal;
