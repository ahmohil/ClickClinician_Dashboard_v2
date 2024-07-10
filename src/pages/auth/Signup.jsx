import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { INPUT_MIN_LENGTH, PHONE_NUMBER_MIN_LENGTH, CountryCodes, DOB_MAX_DATE } from "@constants";
import { Button, CustomInput, CustomDatePicker } from "@components";

import { isDataExists, successToaster, failureToaster } from "@utils";
import SocialLogin from "./SocialLogin";
import { SignUp } from "../../services";
import moment from "moment-timezone";

const SUCCESS_MESSAGE = "Signup successful, Please verify your phone number to complete registration!";

const defaultBody = {
	email: "",
	username: "",
	phone: "",
	password: "",
	confirmPassword: "",
};

const defaultValidationErrors = {
	email: false,
	username: false,
	phone: false,
	password: false,
	confirmPassword: false,
};

const defaultPasswordVisibility = [false, false];

export default function Signup() {
	const navigate = useNavigate();

	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
	const [error, setError] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(defaultPasswordVisibility);
	const [isLoading, setIsLoading] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isAgreed, setIsAgreed] = useState(false);
	const [isPasswordDisMatch, setIsPasswordDisMatch] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [selectedCountryCode, setSelectedCountryCode] = useState(CountryCodes[0]);

	const handleConditionChange = (e) => setIsAgreed(e.target.checked);

	const checkForAgreement = () => !isAgreed;

	const onCountryCodeChange = (e) => setSelectedCountryCode(e);

	const validatePasswords = () => {
		if (body.password) {
			const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
			const isValid = regex.test(body.password);
			if (isValid) {
				setPasswordError(false);
				return true;
			} else {
				setPasswordError(true);
				return false;
			}
		}
	};
	const checkValidation = () => {
		for (let field in body) if (body[field].length <= 0) return true;
		for (let field in validationErrors) if (validationErrors[field]) return true;

		return false;
	};

	const resetStates = () => {
		setBody(defaultBody);
		setValidationErrors(defaultValidationErrors);
		setError("");
		setIsPasswordVisible(false);
		setIsLoading(false);
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

		if (!validatePasswords()) return;

		if (body.password == body.confirmPassword) {
			setIsPasswordDisMatch(false);
		} else if (body.password !== body.confirmPassword) {
			setIsPasswordDisMatch(true);
			setBody({ ...body, confirmPassword: "" });
			return;
		}

		if (checkValidation()) return;

		setIsLoading(true);

		const stateData = {
			phone: `${selectedCountryCode.value}-${body?.phone}`,
			type: "registration",
		};

		const payload = {
			...body,
			countryCode: selectedCountryCode.value,
			timeZone: timeZone,
		};

		try {
			await SignUp(payload);
			resetStates();
			successToaster(SUCCESS_MESSAGE);
			navigate("/auth/otp", { state: stateData });
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
						<h2 className="mb-4">Signup</h2>

						<div className="mb-3">
							<CustomInput
								placeholder="Name"
								name="username"
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

						<div className="mb-3 d-flex gap-3">
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

						<div className="mb-3">
							<CustomInput
								type="email"
								placeholder="Email Address"
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

						<div className="position-relative mb-3">
							<CustomInput
								type={isPasswordVisible[0] ? "text" : "password"}
								placeholder="Enter your password"
								name="password"
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
								minLength={INPUT_MIN_LENGTH}
							/>
							{!isPasswordVisible[0] && (
								<div
									className="eye-ic"
									onClick={() => {
										let temp = [...isPasswordVisible];
										temp[0] = true;
										setIsPasswordVisible(temp);
									}}>
									<span className="iconify" data-icon="ic:baseline-remove-red-eye"></span>
								</div>
							)}
							{isPasswordVisible[0] && (
								<div
									className="eye-ic"
									onClick={() => {
										let temp = [...isPasswordVisible];
										temp[0] = false;
										setIsPasswordVisible(temp);
									}}>
									<span className="iconify" data-icon="ph:eye-slash"></span>
								</div>
							)}

							{passwordError && (
								<div className="error">
									Password must contain at least one upper case letter, one number, and be at least 8 characters long.{" "}
								</div>
							)}
						</div>

						<div className="position-relative mb-3">
							<CustomInput
								type={isPasswordVisible[1] ? "text" : "password"}
								placeholder="Confirm Password"
								name="confirmPassword"
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
								minLength={INPUT_MIN_LENGTH}
							/>

							{!isPasswordVisible[1] && (
								<div
									className="eye-ic"
									onClick={() => {
										let temp = [...isPasswordVisible];
										temp[1] = true;
										setIsPasswordVisible(temp);
									}}>
									<span className="iconify" data-icon="ic:baseline-remove-red-eye"></span>
								</div>
							)}
							{isPasswordVisible[1] && (
								<div
									className="eye-ic"
									onClick={() => {
										let temp = [...isPasswordVisible];
										temp[1] = false;
										setIsPasswordVisible(temp);
									}}>
									<span className="iconify" data-icon="ph:eye-slash"></span>
								</div>
							)}
						</div>

						{isPasswordDisMatch && (
							<div className="error text-center"> Password and confirm password does not match!!</div>
						)}

						{isDataExists(error) && <div className="server-error text-center my-3">{error}</div>}

						<div className="d-flex align-items-center justify-content-start my-lg-4 my-3 ">
							<div className="d-flex ms-2">
								<input type="checkbox" id="flexCheckDefault" checked={isAgreed} onChange={handleConditionChange} />
								<label className="" htmlFor="flexCheckDefault">
									I Understand the
									<a
										href={"/terms-of-services"}
										target="_blank"
										rel="noopener noreferrer"
										className="fs-md-14 pointer fw-600 primary-text line-clamp-inline">
										{" "}
										Term and Services
									</a>
								</label>
							</div>
						</div>

						<Button
							text="Signup"
							className="primary-btn w-100"
							hasIcon={true}
							hasImgRight="/assets/images/arrow.svg"
							isBusy={isLoading}
							validator={checkForAgreement}
							onClick={onSubmit}
						/>

						<div className="my-lg-5 my-3 primary-text text-center fs-12 fw-600">or</div>

						<SocialLogin />
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
}
