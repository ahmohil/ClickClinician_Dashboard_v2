import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button, CustomInput } from "@components";
import { SignIn } from "@services";
import { failureToaster, isDataExists, successToaster } from "@utils";
import { userStore } from "@store";
import { CountryCodes } from "@constants";
import { useAuth } from "../../hooks/useAuth";

const defaultBody = {
	username: "",
	password: "",
};

const defaultValidationErrors = {
	username: false,
	password: false,
};

const SUCCESS_MESSAGE = "Logged In Successfully!!";

export default function Login() {
	const navigate = useNavigate();

	const UserStore = userStore((state) => state);
	const { loggedInUser } = useAuth();
	const setAuth = userStore((state) => state.setAuth);
	const [body, setBody] = useState(defaultBody);
	const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
	const [error, setError] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

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

	const onSubmit = async (e) => {
		e.preventDefault();
		if (checkValidation() || isLoading) return;
		setIsLoading(true);

		try {
			const result = await SignIn(body.username, body.password);
			await setAuth(result);
			resetStates();
			successToaster(SUCCESS_MESSAGE);
			if (rememberMe) localStorage.setItem("rememberMe", "true");
			else localStorage.removeItem("rememberMe");
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
			setError(error.message);
		}
	};


	useEffect(() => {
		if (UserStore.loggedInUser) {
			navigate("/admin/agencies");
		}
		console.log("Inside the useEffect")
		console.log("state", UserStore)
		console.log("loggedInUser", loggedInUser)
	}, [UserStore]);

	useEffect(() => {
		const rememberMeLocalStorage = localStorage.getItem("rememberMe");
		if (rememberMeLocalStorage === "true") setRememberMe(true);
	}, []);

	return (
		<div className="auth-bg d-lg-flex">
			<div className="col-lg-6 d-lg-block d-none ">
				<div className="auth-banner">
					{/* <img src="/assets/images/auth-bg1.png" className="w-auto" alt="" /> */}
					<iconify-icon icon="dashicons:admin-users"  style={{color: "white", fontSize:"58px"}}></iconify-icon>
					<h2>Hello, Admin!</h2>
					<p>Enter your personal details to continue</p>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="auth-form">
					{/* <div className="auth-logo pt-lg-5 mb-3">
						<img src="/assets/images/logo.svg" alt="" />
					</div> */}
					<form action="">
						<h2 className="mb-5 ">Login</h2>

						<div className="mb-4">
							<CustomInput
								placeholder="Email"
								type="email"
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


						<div className="position-relative mb-4">
							<CustomInput
								type={isPasswordVisible ? "text" : "password"}
								placeholder="Password"
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
							/>
							{!isPasswordVisible && (
								<div className="eye-ic" onClick={() => setIsPasswordVisible(true)}>
									<span className="iconify" data-icon="fa:eye"></span>
								</div>
							)}
							{isPasswordVisible && (
								<div className="eye-ic" onClick={() => setIsPasswordVisible(false)}>
									<span className="iconify" data-icon="fa-solid:eye-slash"></span>
								</div>
							)}
						</div>

						<div className="d-flex align-items-center justify-content-between my-lg-4 my-3">
							<div className="d-flex align-items-center">
								<input type="checkbox" id="flexCheckDefault" checked={rememberMe} onChange={handleRememberMeChange} />
								<label className="mb-0 muted-text fs-14" htmlFor="flexCheckDefault">
									Remember me?
								</label>
							</div>
							<Link to={"/auth/forget-password"} className="primary-text fs-14 fw-600">
								Forgot Password?
							</Link>
						</div>

						{isDataExists(error) && <div className="server-error text-center mt-5 mb-4">{error}</div>}

						<Button
							text="Login"
							onClick={onSubmit}
							className="primary-btn w-100"
							hasIcon={true}
							hasImgRight="/assets/images/arrow.svg"
							isBusy={isLoading}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
