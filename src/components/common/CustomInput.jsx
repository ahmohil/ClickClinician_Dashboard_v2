import { Fragment, useEffect, useState } from "react";
import { validateInput, isDataExists } from "@utils";
import { numericOnly, phoneNumber } from "@directives";

const CustomInput = ({
	type = "text",
	placeholder = "Enter Here...",
	setState,
	name,
	state,
	isRequired = false,
	isPasteDisabled = false,
	pattern = null,
	minLength = null,
	maxLength = null,
	min = null,
	max = null,
	step = null,
	serverError = "",
	setServerError,
	setValidationsState = null,
	onPressEnter = null,
	autoFocus = false,
	isReadOnly = false,
	isPhoneNumber = false,
	isNumericOnly = false,
	extraClasses = "",
	isFormSubmitted = false,
	externalStyles = {},
	icon = undefined,
	iconifyIcon = undefined,
	isDisabled = false,
}) => {
	const [validationErrors, setValidationErrors] = useState([]);
	const [emailValidationErrorExists, setEmailValidationErrorExists] = useState(false);
	const [passwordValidationErrorExists, setPasswordValidationErrorExists] = useState(false);

	const inputValidation = (e, nameField) => {
		if (!!!setValidationsState) return;

		const errors = validateInput(e, nameField);
		setValidationErrors(errors);

		if (isDataExists(errors)) setValidationsState((prev) => ({ ...prev, [name]: true }));
		else {
			setValidationsState((prev) => ({ ...prev, [name]: false }));
			if (!!setServerError) setServerError("");
		}
	};

	const onValidateEmail = (e) => {
		if (!!!setValidationsState) return;
		setEmailValidationErrorExists(!!e.target.value && !e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
	};

	const onValidatePassword = (e, nameFeild) => {
		// const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

		// if (!!!setValidationsState) return;

		// const isValid = !!e.target.value && !!e.target.value.match(regex);


		// if (!isValid) {
		// 	setValidationsState((prev) => ({
		// 		...prev,
		// 		[name]: true,
		// 	}));
		// }

		// if (!isValid) {
		// 	setPasswordValidationErrorExists(true);
		// } else {
		// 	setPasswordValidationErrorExists(false);
		// }

		setPasswordValidationErrorExists(false)
	};

	const onValidateUrl = (e) => {
		if (!!!setValidationsState) return;
		setEmailValidationErrorExists(
			!!e.target.value &&
				!e.target.value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9-\.]+\.[a-z]{2,4}/)
		);
	};

	const setStateValue = (e) => {
		let value = e.target.value;
		if (type === "number") {
			if (min && value < min) value = min;
			if (max && value > max) value = max;
		}

		setState((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		if (isFormSubmitted && isRequired && !!!state[name]) {
			setValidationErrors(["This field is required"]);
			setValidationsState((prev) => ({ ...prev, [name]: true }));
		}
	}, [isFormSubmitted]);

	return (
		<Fragment>
			{icon && <i className={`icon ${icon}`}></i>}
			<input
				style={externalStyles}
				className={` ${extraClasses} ${
					isDataExists(validationErrors) || isDataExists(serverError) ? "error-input" : ""
				}`}
				type={type}
				placeholder={placeholder}
				value={state[name] || ""}
				readOnly={isReadOnly}
				autoFocus={autoFocus}
				{...(!!isRequired && { required: true })}
				{...(!!pattern && { pattern })}
				{...(!!minLength && { minLength })}
				{...(!!maxLength && { maxLength })}
				{...(!!min && { min })}
				{...(!!max && { max })}
				{...(!!step && { step })}
				onChange={(e) => {
					setStateValue(e);
					inputValidation(e, name);
				}}
				onPaste={(e) => {
					if (!!isPasteDisabled) e.preventDefault();
				}}
				onKeyPress={(e) => {
					if (!!isPhoneNumber) phoneNumber(e);
					if (!!isNumericOnly) numericOnly(e);
				}}
				onKeyUp={(e) => {
					if (e.key === "Enter" && !!onPressEnter) onPressEnter(e);
				}}
				onBlur={(e) => {
					if (type === "email") onValidateEmail(e);

					if (type === "password" || (type === "text" && name === "password") || name == "confirmPassword") {
						onValidatePassword(e, name);
					}

					if (type === "url") onValidateUrl(e);
				}}
				disabled={isDisabled}
			/>
			{iconifyIcon && <span className="iconify" data-icon={iconifyIcon}></span>}

			{!isFormSubmitted && emailValidationErrorExists && (
				<div className="error">Please enter a valid email address.</div>
			)}

			{!isFormSubmitted && passwordValidationErrorExists && (
				<div className="error">
					Password must contain at least one upper case letter, one number, and be at least 8 characters long.{" "}
				</div>
			)}

			{isFormSubmitted &&
				isDataExists(validationErrors) &&
				validationErrors.map((error, i) => (
					<div key={i} className="error">
						{error}
					</div>
				))}
		</Fragment>
	);
};

export default CustomInput;
