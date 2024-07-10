import { Fragment, useEffect, useState } from "react";
import { titleCase } from "./../../transformers/TextFormation";
import { isDataExists } from "@utils";
import ChatRow from "./ChatRow";
import { NoData } from "../../components";
import { ChatTabs } from "../../constants";
import { userStore } from "../../store/user";

const ChatGroupSide = ({
	getAllChat,
	chats,
	chatRequests = [],
	activeChat,
	setActiveChat,
	setActiveChatTab,
	activeChatTab,
	chatList,
	setChatList,
	setChats,
}) => {
	const loggedInUser = userStore((state) => state.loggedInUser);

	const [searchValue, setSearchValue] = useState("");
	const [activeRequest, setActiveRequest] = useState(null);
	// const [filteredChats, setFilteredChats] = useState([]);

	const resetStates = (tab) => {
		isDataExists(chats) && tab === "chats" && !!!activeChat ? setActiveChat(chats[0]) : setActiveChat(null);
		isDataExists(chatRequests) ? setActiveRequest(chatRequests[0]) : setActiveRequest(null);
		setSearchValue("");
	};

	const onTabChange = (tab) => {
		if (activeChatTab === tab) {
		} else {
			setActiveChatTab(tab);
			getAllChat();
			resetStates(tab);
		}
	};

	const filteredChats = chats.filter((item) => {
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
		<div>
			<ul className="tabs">
				{ChatTabs.map((tab, i) => (
					<li key={i}>
						<div className={`tab pointer ${activeChatTab === tab ? "active" : ""}`} onClick={() => onTabChange(tab)}>
							<div className="">
								<div>{titleCase(tab)}</div>
							</div>
						</div>
					</li>
				))}
			</ul>

			<div className="my-3 mx-3">
				<input
					type="text"
					placeholder="Search"
					required
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					style={{ border: "none", background: "#F7F7FC" }}
					className="split-input "
				/>
			</div>

			{activeChatTab === "chats" && (
				<Fragment>
					{isDataExists(filteredChats) && (
						<ul className="patient-chat">
							{filteredChats.map((item, index) => (
								<ChatRow
									key={item.slug}
									item={item}
									index={index}
									activeChat={activeChat}
									setActiveChat={setActiveChat}
									getAllChat={getAllChat}
									setChatList={setChatList}
									chatList={chatList}
								/>
							))}
						</ul>
					)}
					{!isDataExists(filteredChats) && (
						<h5 className="small text-center centered mh-250 text-muted ">
							<strong className="">No Chats Yet!!</strong>
						</h5>
					)}
				</Fragment>
			)}
		</div>
	);
};

export default ChatGroupSide;
