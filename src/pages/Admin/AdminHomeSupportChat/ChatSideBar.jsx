import { isDataExists } from "@utils";
import { Fragment, useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../socket";
import { titleCase } from "../../../transformers/TextFormation";
import { timesAgoFromDate } from "../../../transformers/TimeFormatter";
import { NO_IMAGE } from "../../../constants";
import { userStore } from "../../../store/user";

const ChatSideBar = ({ item, isRequest = false, activeChat, setActiveChat, getAllChat, setChatList, chatList }) => {
	const loggedInUser = userStore((state) => state.loggedInUser);
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (loggedInUser) {
			socket.on(`${activeChat.slug}-last-message`, (e) => {
				getAllChat("previous");
			});
		}

		return () => {
			socket.off(`${activeChat.slug}-last-message`);
		};
	}, [loggedInUser, activeChat]);

	return (
		<li>
			<div
				className={` pointer ${activeChat && activeChat.slug === item.slug ? "active" : ""}`}
				onClick={() => {
					!isRequest && setActiveChat(item);
					setChatList(false);
				}}>
				<div className="d-flex align-items-center flex-1 gap-3 p-3">
					<div className="patient-img">
						{isRequest && <img src={item?.sender?.profileImage} alt={NO_IMAGE} />}
						{item?.sender?._id.toString() === loggedInUser?._id.toString() && (
							<img src={item?.receiver?.profileImage} alt={NO_IMAGE} />
						)}
						{item?.receiver?._id.toString() === loggedInUser?._id.toString() && (
							<img src={item?.sender?.profileImage} alt={NO_IMAGE} />
						)}
					</div>
					<div className="patient-details flex-1 position-relative">
						<div className="d-flex align-items-center justify-content-between">
							<div className="d-flex flex-column">
								<div className="fs-md-14 light-text1 fw-600 mb-2">
									<Fragment>
										{loggedInUser?._id === item.receiver?._id && titleCase(item?.sender?.username)}
										{loggedInUser?._id === item.sender?._id && titleCase(item?.receiver?.username)}
									</Fragment>
								</div>
								{isDataExists(item?.lastMessage) && (
									<div className="fs-12 msg-w text-truncate fw-600">{item?.lastMessage}</div>
								)}
							</div>
						</div>
						<div className="light-text1 min-handle">{timesAgoFromDate(item?.updatedAt)}</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default ChatSideBar;
