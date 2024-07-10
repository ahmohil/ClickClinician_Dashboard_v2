import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { titleCase, DateFormatter } from "@transformers";
import { FileUploader } from "@components";
import { EnrichImageViewer } from "@components";
import { isDataExists, failureToaster } from "@utils";
import { GetAllMessage, SendMessage } from "@services";
import { NO_IMAGE } from "@constants";

import { userStore } from "../../../store/user";
import { SocketContext } from "../../../socket";
import { ChatTabs } from "../../../constants";

const MessageContainer = ({ activeChat, getAllChat, activeChatTab, chatList, setChatList }) => {
	const socket = useContext(SocketContext);
	const loggedInUser = userStore((state) => state.loggedInUser);

	const UserStore = userStore((state) => state);

	const messagesEndRef = useRef(null);

	const [messageList, setMessageList] = useState([]);
	const [messageText, setMessageText] = useState("");
	const [attachmentImages, setAttachmentImages] = useState([]);
	const [isAttachmentImageUploading, setIsAttachmentImageUploading] = useState(false);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [previewAttachment, setPreviewAttachment] = useState([]);
	const [msgCount, setMsgCount] = useState(0);

	const isSenderChatOpen = activeChat?.sender?._id?.toString() === loggedInUser?._id?.toString();

	const isSender = (message) => message?.sender?._id?.toString() === loggedInUser?._id?.toString();

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

	const onUploadAttachmentImage = (file) => {
		setAttachmentImages([{ url: file.url }, ...attachmentImages]);
		setTimeout(() => scrollToBottom(), 10);
	};

	const onDelAttachmentImage = (index) => setAttachmentImages(attachmentImages.filter((image, i) => i !== index));

	const handlePreview = (imageAttachment, imageIndex) => {
		setSelectedImageIndex(imageIndex);
		setPreviewAttachment(imageAttachment);
		setPreviewVisible(true);
	};

	const sendMessageValidations = () => !isDataExists(messageText.trim()) && !isDataExists(attachmentImages);

	const sendMessage = async () => {
		if (sendMessageValidations()) return failureToaster("Please enter message or select attachment to send.");

		let payload = {
			text: messageText,
			chatId: activeChat?._id.toString(),
			receiverId: loggedInUser._id == activeChat.receiver._id ? activeChat.sender._id : activeChat.receiver._id,
			attachment: attachmentImages,
			type: "home",
		};
		await SendMessage(payload);

		resetMessageState();
		getSelectedChatMessages();
		setTimeout(() => scrollToBottom(), 10);
	};

	const getSelectedChatMessages = async () => {
		if (activeChat?._id) {
			try {
				let result = await GetAllMessage(activeChat?._id);
				setMessageList(result);

				setTimeout(() => {
					scrollToBottom();
				}, 0);
			} catch (err) {
				failureToaster(err.message);
			}
		} else {
			return;
		}
	};

	useEffect(() => {
		scrollToBottom();

		if (!!activeChat && isDataExists(activeChat)) {
			getSelectedChatMessages();
			scrollToBottom();
		}
	}, [activeChat]);

	useEffect(() => {
		if (loggedInUser) {
			socket.on(`${loggedInUser?._id}-new-message`, (e) => {
				if (!!loggedInUser?._id && e.receiver.toString() === loggedInUser?._id) getSelectedChatMessages();

				getAllChat("previous");
			});
		}

		return () => {
			socket.off(`${loggedInUser?._id}-new-message`);
			setAttachmentImages([]);
		};
	}, [loggedInUser, activeChat]);

	return (
		<div className={!chatList ? "d-block" : "d-md-block d-none"}>
			<button
				className="d-md-none d-flex gap-2 align-items-center mb-2 bg-transparent"
				onClick={() => setChatList(true)}>
				<iconify-icon icon="bx:arrow-back"></iconify-icon>
				Back
			</button>
			<EnrichImageViewer
				selectedImageIndex={selectedImageIndex}
				previewImages={previewAttachment}
				previewVisible={previewVisible}
				setPreviewVisible={setPreviewVisible}
			/>

			<div className="card-box scroll-list">
				{(!!!activeChat || activeChatTab === ChatTabs[1]) && (
					<div className="d-flex align-items-center justify-content-center h-100">
						<h5 className="small text-center text-muted">
							{" "}
							<strong>Please select a chat to view messages.</strong>
						</h5>
					</div>
				)}

				{activeChatTab === ChatTabs[0] && (
					<Fragment>
						{!!activeChat && (
							<div className="d-flex align-items-start gap-2 mb-3 ">
								<div className="d-flex align-items-center flex-1 gap-3">
									<div className="patient-img">
										<img
											src={isSenderChatOpen ? activeChat?.receiver?.profileImage : activeChat?.sender?.profileImage}
											alt={NO_IMAGE}
										/>
									</div>
									<div className="patient-details">
										<div className="d-flex align-items-center justify-content-between">
											<div className="fs-md-14 light-text1 fw-600 mb-2">
												{isSenderChatOpen
													? titleCase(activeChat?.receiver?.username)
													: titleCase(activeChat?.sender?.username)}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						<div className="inner-chat border-top pt-2" ref={messagesEndRef}>
							{!!activeChat && (
								<Fragment>
									{messageList?.map((item, index) => {
										return (
											<Fragment key={index}>
												<div className={`mb-4 ${isSender(item) ? "text-end" : ""}`}>
													<div className="">
														<div>
															{isDataExists(item?.text) && !isDataExists(item?.attachment) && (
																<div className={`mb-1 ${isSender(item) ? "receiver  " : "sender text-start"}`}>
																	{item?.text}
																</div>
															)}
														</div>
													</div>
												</div>
											</Fragment>
										);
									})}
								</Fragment>
							)}
						</div>

						{!!activeChat && (
							<div className="chat-input mb-5">
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
										className="primary-btn send-btn"
										onClick={sendMessage}>
										<img src="/assets/svgs/sender.svg" alt="" />
									</button>
								</div>
							</div>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default MessageContainer;
