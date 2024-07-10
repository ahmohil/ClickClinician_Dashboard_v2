import React, { useEffect, useState } from "react";
import { userStore } from "@store";
import { isDataExists } from "@utils";
import { timesAgoFromDate } from "@transformers";

const DashboardChatListComponent = ({ handleSelectChat, chatList }) => {
	const UserStore = userStore((state) => state);
	const loggedInUser = UserStore?.loggedInUser;
	const [searchValue, setSearchValue] = useState("");

	const filteredChats = chatList.filter((item) => {
		const senderMatches = item.sender?._id == loggedInUser._id;
		const receiverMatches = item.receiver?._id == loggedInUser._id;

		if (searchValue === "") {
			return senderMatches || receiverMatches;
		}

		if (senderMatches) {
			return item.receiver?.username.toLowerCase().includes(searchValue.toLowerCase());
		}

		if (receiverMatches) {
			return item.sender?.username.toLowerCase().includes(searchValue.toLowerCase());
		}

		return false;
	});

	return (
		<>
			<div className="position-relative mb-3">
				<input
					type="text"
					placeholder="Search"
					required
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					style={{ border: "none", background: "#F7F7FC" }}
					className="split-input "
				/>
				<button
					type="button"
					className="primary-btn"
					style={{ position: "absolute", right: "4px", top: "4px", width: "48px" }}>
					<img src="/assets/images/search.svg" alt="" />
				</button>
				{/* <Button style={{ position: "absolute", right: "4px", top: "4px", width: "48px" }} className="primary-btn" hasIcon={true} hasImgLeft="/assets/images/search.svg" /> */}
			</div>
			{!isDataExists(filteredChats) && (
				<div className="d-flex align-items-center justify-content-center h-100">
					<h5 className="small text-center text-muted">
						<strong>Chat not found or no messages available.</strong>
					</h5>
				</div>
			)}
			<ul className="patient-chat-2">
				{isDataExists(filteredChats) &&
					filteredChats.map((item, index) => {
						return (
							<React.Fragment key={index}>
								{item?.sender?._id === loggedInUser?._id && (
									<li>
										<a onClick={() => handleSelectChat(item)}>
											<div className="d-flex align-items-center flex-1 gap-3 p-3">
												<div className="patient-img">
													<img src={item?.receiver?.profileImage} alt="" />
												</div>
												<div className="patient-details flex-1">
													<div className="d-flex align-items-center justify-content-between">
														<div>
															<div className="fs-md-14 light-text1 fw-600 mb-1">{item?.receiver?.username}</div>
															{isDataExists(item?.lastMessage) && (
																<p className="fs-md-14 fw-500 grey-text text-truncate w-90  mb-0 ">
																	{item?.lastMessage}
																</p>
															)}
															{!isDataExists(item?.lastMessage) && item?.lastMessage?.attachment?.length > 0 && (
																<div className="">
																	<iconify-icon icon="material-symbols:image-outline"></iconify-icon>
																</div>
															)}
														</div>
														<div className="fs-md-14 fw-500 light-text1">{timesAgoFromDate(item?.updatedAt)}</div>
													</div>
												</div>
											</div>
										</a>
									</li>
								)}
								{item?.receiver?._id == loggedInUser?._id && (
									<li>
										<a onClick={() => handleSelectChat(item)}>
											<div className="d-flex align-items-center flex-1 gap-3 p-3">
												{isDataExists(item?.sender?.profileImage) && (
													<div className="patient-img">
														<img src={item?.sender?.profileImage} alt="" />
													</div>
												)}

												{!isDataExists(item?.sender?.profileImage) && (
													<div className="patient-img">
														<img src="/images/dummy.png" alt="" />
													</div>
												)}
												{/* <div className="patient-img">
													<img src={item?.buyer?.profileImage} alt="" />
												</div> */}
												<div className="patient-details flex-1">
													<div className="d-flex align-items-center justify-content-between">
														<div>
															<div className="fs-md-14 light-text1 fw-600 mb-1">{item?.sender?.username}</div>
															{isDataExists(item?.lastMessage) && (
																<p className="fs-md-14 fw-500 grey-text text-truncate w-90 mb-0">{item?.lastMessage}</p>
															)}
															{!isDataExists(item?.lastMessage) && item?.lastMessage?.attachment?.length > 0 && (
																<div className="">
																	<iconify-icon icon="material-symbols:image-outline"></iconify-icon>
																</div>
															)}
														</div>
														<div className="fs-md-14 fw-500 light-text1">{timesAgoFromDate(item?.updatedAt)}</div>
													</div>
												</div>
											</div>
										</a>
									</li>
								)}
							</React.Fragment>
						);
					})}
			</ul>
		</>
	);
};

export default DashboardChatListComponent;
