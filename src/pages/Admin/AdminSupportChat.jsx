import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetAllSupports, ChangeSupportStatus, CreateSupportChat, SendMessage, GetAllMessage } from "../../services";
import { isDataExists } from "../../utils/generic";
import { failureToaster, successToaster } from "../../utils/swal";
import { userStore } from "../../store/user";
import { Button, FileUploader } from "../../components";
import { DateFormatter } from "../../transformers/DateFormatter";
import { SocketContext } from "../../socket";
import { NO_IMAGE } from "../../constants";
import { titleCase } from "../../transformers/TextFormation";

const AdminSupportChat = () => {
	const socket = useContext(SocketContext);
	const navigate = useNavigate();
	const location = useLocation();
	const loggedInUser = userStore((state) => state.loggedInUser);
	const messagesEndRef = useRef(null);

	const [messageList, setMessageList] = useState([]);
	const [messageText, setMessageText] = useState("");
	const [attachmentImages, setAttachmentImages] = useState([]);

	const [isAttachmentImageUploading, setIsAttachmentImageUploading] = useState(false);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [previewAttachment, setPreviewAttachment] = useState([]);

	const onUploadAttachmentImage = (file) => setAttachmentImages([{ url: file.url }, ...attachmentImages]);

	const scrollToBottom = () => {
		messagesEndRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });

		if (!!messagesEndRef?.current) {
			messagesEndRef.current.scrollTop = messagesEndRef?.current?.scrollHeight;
		}
	};

	const resetMessageState = () => {
		setMessageText("");
		setAttachmentImages([]);
	};

	const sendMessageValidations = () => !isDataExists(messageText) && !isDataExists(attachmentImages);

	const chatId = location.state.chat._id;

	const isSender = (message) => message?.sender?._id?.toString() === loggedInUser?._id?.toString();

	const onDelAttachmentImage = (index) => setAttachmentImages(attachmentImages.filter((image, i) => i !== index));

	const sendMessage = async () => {
		if (sendMessageValidations()) return failureToaster("Please enter message or select attachment to send.");

		let payload = {
			text: messageText,
			chatId: chatId,
			attachment: attachmentImages,
		};
		await SendMessage(payload);

		getSelectedChatMessages();

		resetMessageState();
	};

	const getSelectedChatMessages = async () => {
		try {
			let result = await GetAllMessage(chatId);
			setMessageList(result);

			setTimeout(() => {
				scrollToBottom();
			}, 0);
		} catch (err) {
			failureToaster(err.message);
		}
	};

	useEffect(() => {
		getSelectedChatMessages();
	}, [chatId]);

	useEffect(() => {
		if (!!location?.state) {
			socket.on(`${location?.state?.chat?.slug}-new-message`, (e) => {
				getSelectedChatMessages();
			});
		}

		return () => {
			socket.off(`${location?.state?.chat?.slug}-new-message`);
		};
	}, [location?.state]);

	return (
		<div className="container profile py-4">
			<div className="row mb-lg-4">
				<div className="col-md-5 mb-4">
					<div className="mb-md-4 mb-3">
						<h2 className="fs-22 fw-500">
							Request Id:
							<span className="fs-22 fw-600 dark-blue-texts ">{location?.state?.requestId}</span>
						</h2>

						<button className="mt-3" onClick={() => navigate("/admin/support-tickets")}>
							<span className="fs-22">
								<iconify-icon icon="lets-icons:back-light"></iconify-icon>
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-lg-10 col-md-7">
					<div className="card-box scroll-list">
						<Fragment>
							<div className="d-flex align-items-start gap-2 mb-4">
								<div className="d-flex align-items-center flex-1 gap-3">
									<div className="patient-img">
										<img src={location?.state?.user?.profileImage} alt={NO_IMAGE} />
									</div>
									<div>
										<div className="fs-md-14 light-text1 fw-600 mb-2">{titleCase(location?.state?.user?.username)}</div>
										{/* <div className="fs-13 fw-500 grey-text">Online</div> */}
									</div>
								</div>
							</div>

							<div className="inner-chat" ref={messagesEndRef}>
								<Fragment>
									{messageList?.map((item, index) => {
										return (
											<Fragment key={index}>
												<div className={`mb-4 ${isSender(item) ? "text-end" : ""}`}>
													<div>
														{isDataExists(item?.attachment) && (
															<div className={`mb-1 ${isSender(item) ? "receiver " : "sender"}`}>
																<div className="row justify-content-end">
																	{item?.attachment?.map((image, index) => (
																		<div
																			key={index}
																			className={`col-md-12 ${item?.attachment?.length >= 2 ? "my-2" : ""}`}>
																			<div className="attachment-img">
																				<img
																					src={image.url}
																					className="pre-img pointer"
																					alt={NO_IMAGE}
																					onClick={() => handlePreview(item?.attachment, index)}
																				/>
																			</div>
																		</div>
																	))}
																</div>
															</div>
														)}
														<div>
															{isDataExists(item?.text) && (
																<div
																	className={`mb-1 ${
																		isSender(item) ? "receiver break-all " : "sender text-start break-all"
																	}`}>
																	{item?.text}
																</div>
															)}
														</div>
													</div>
													{/* <div className="sender-img mb-1">
												<img src={item?.seller?.profileImage} alt="" />
											</div> */}
													<div className="light-text1 fw-600 fs-10">{DateFormatter(item?.updatedAt, "shortTime")} </div>
												</div>
											</Fragment>
										);
									})}

									{!!attachmentImages && isDataExists(attachmentImages) && (
										<div className="text-end">
											<div style={{ maxWidth: "350px" }} className="receiver d-inline-block ms-auto">
												<div className="d-flex flex-wrap justify-content-start  gap-3">
													{attachmentImages.map((image, index) => (
														<div key={index} className="multiple-attachment-img">
															<img
																src={image.url}
																className="pre-img pointer"
																alt={NO_IMAGE}
																onClick={() => handlePreview(attachmentImages, index)}
															/>
															<div className="cross-ic fs-24 settings ">
																<a className="pointer primary-text" onClick={() => onDelAttachmentImage(index)}>
																	<iconify-icon icon="entypo:circle-with-cross"></iconify-icon>
																</a>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									)}
								</Fragment>
							</div>

							<div className="chat-input">
								<input
									type="text"
									value={messageText}
									onKeyDown={(e) => {
										if (e.key === "Enter" && isDataExists(messageText)) sendMessage();
									}}
									onChange={(e) => setMessageText(e.target.value)}
									placeholder="Type something"
									className="text-message"
								/>

								<div className="send-btns d-flex align-items-center gap-3">
									<a className="pointer attachment-btn">
										<FileUploader
											isLoading={isAttachmentImageUploading}
											setIsLoading={setIsAttachmentImageUploading}
											onUploadFile={onUploadAttachmentImage}
										/>
										<img src="/assets/images/upload.svg" alt="" />{" "}
									</a>

									<button
										type="button"
										disabled={sendMessageValidations()}
										className="primary-btn"
										onClick={sendMessage}>
										<img src="/assets/svgs/sender.svg" alt="" />
									</button>
								</div>
							</div>
						</Fragment>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminSupportChat;
