import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, CustomInput } from "@components";
import { ResetPassword } from "@services";
import { failureToaster, isDataExists, successToaster } from "@utils";
import { INPUT_MIN_LENGTH } from "@constants";
import { userStore } from "@store";

const defaultBody = {
	password: "",
	confirmPassword: "",
};

const defaultValidationErrors = {
	confirmPassword: false,
	password: false,
};

const defaultPasswordVisibility = [false, false];

const SUCCESS_MESSAGE = "Password reset successful";

const SetPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const UserStore = userStore((state) => state);

	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
	const [error, setError] = useState("");
	const [isPasswordDisMatch, setIsPasswordDisMatch] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(defaultPasswordVisibility);
	const [isLoading, setIsLoading] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const checkValidation = () => {
		for (let field in body) if (body[field].length <= 0) return true;
		for (let field in validationErrors) if (validationErrors[field]) return true;

		return false;
	};

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

	const resetStates = () => {
		setBody(defaultBody);
		setValidationErrors(defaultValidationErrors);
		setError("");
		setIsPasswordVisible(false);
		setIsLoading(false);
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

		try {
			const user = await ResetPassword(body.password, location.state.resetPasswordToken, location.state.phone);
			UserStore.setAuth(user);
			successToaster(SUCCESS_MESSAGE);
			resetStates();
			navigate("/");
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
						<h2 className="mb-4">Password Reset</h2>
						<p className="mb-4">
							Welcome to our SplitMart ! To enhance the security of your account, please take a moment to create a
							strong password.{" "}
						</p>

						<div className="mb-3">
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
									placeholder="Enter Password Again"
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
						</div>

						{isPasswordDisMatch && <div className="error"> Password and confirm password does not match!!</div>}

						{isDataExists(error) && <div className="server-error text-center my-3">{error}</div>}

						<Button
							text="Continue"
							onClick={onSubmit}
							className="primary-btn w-100 mt-3"
							hasIcon={true}
							hasImgRight="/assets/images/arrow.svg"
							isBusy={isLoading}
						/>
					</form>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default SetPassword;
