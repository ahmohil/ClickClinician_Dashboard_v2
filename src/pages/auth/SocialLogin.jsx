import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { environmentUrls } from "@constants";
import { failureToaster, successToaster, isDataExists } from "@utils";
import { Button } from "@components";
import { userStore } from "@store";
import { PhoneNumberModal } from "@modals";

// const appleBtnStyle = { background: "#14142B", borderColor: "#14142B" };
const googleBtnStyle = { background: "#FF4C4D", borderColor: "#FF4C4D" };
const facebookBtnStyle = { background: "#1877F2", borderColor: "#1877F2" };

const SUCCESS_MESSAGE = "Logged In Successfully!!";

const SocialLogin = () => {
	const navigate = useNavigate();

	const UserStore = userStore((state) => state);

	const [userToLogin, setUserToLogin] = useState(null);
	const [error, setError] = useState("");

	const onSuccessfulLogin = (data) => {
		setError("");
		if (!data.isSocialProfileCompleted) return setUserToLogin(data);
		else {
			UserStore.setAuth(data);
			successToaster(SUCCESS_MESSAGE);
			navigate("/");
		}
	};

	const openWindowAndListen = (platform) => {
		window.open(`${environmentUrls.api_url}/externalAuth/${platform}`, "Login", "location=1,status=1,scrollbars=1, width=400,height=400");
		window.addEventListener("message", (message) => {
			if (message.data.user) onSuccessfulLogin(message.data.user);
			else if (message.data.err) {
				setError(message.data.err);
				failureToaster(message.data.err);
			}
		});
	};

	return (
		<Fragment>
			{isDataExists(error) && <div className="server-error text-center mt-5 mb-4">{error}</div>}
			<div className="d-flex flex-md-row flex-column gap-2">
				<Button
					style={googleBtnStyle}
					className="primary-btn w-100"
					hasImgRight="/assets/images/google.svg"
					onClick={(e) => {
						e.preventDefault();
						openWindowAndListen("google");
					}}
				/>
				{/* <Button
					style={appleBtnStyle}
					className="primary-btn w-100"
					hasImgRight="/assets/images/apple.svg"
					onClick={(e) => {
						e.preventDefault();
						openWindowAndListen("apple");
					}}
				/> */}
				<Button
					style={facebookBtnStyle}
					className="primary-btn w-100"
					hasImgRight="/assets/images/f.svg"
					onClick={(e) => {
						e.preventDefault();
						openWindowAndListen("facebook");
					}}
				/>
			</div>
			{userToLogin && <PhoneNumberModal user={userToLogin} discardUser={() => setUserToLogin(null)} />}
		</Fragment>
	);
};

export default SocialLogin;
