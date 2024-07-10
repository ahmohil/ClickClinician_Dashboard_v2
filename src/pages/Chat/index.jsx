import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userStore } from "@store";
import { GetAllChat } from "@services";
import { failureToaster, isDataExists } from "@utils";
import ChatGroupSide from "./ChatGroupSide";
import MessageContainer from "./MessageContainer";
import { CustomSpinner } from "../../components";
import { ChatTabs } from "../../constants";

const Chat = () => {
	const location = useLocation();

	const loggedInUser = userStore((state) => state.loggedInUser);

	const [chats, setChats] = useState([]);
	const [activeChat, setActiveChat] = useState(null);
	const [chatRequests, setChatRequests] = useState([]);
	const [isChatsLoading, setIsChatsLoading] = useState(true);
	const [activeChatTab, setActiveChatTab] = useState(ChatTabs[0]);
	const [chatList, setChatList] = useState(true);
	const [isFetching, setIsFetching] = useState(true);

	const getAllChat = async (type) => {
		try {
			if (type == "previous") {
				setIsChatsLoading(false);
			} else {
				setIsChatsLoading(true);
			}

			const query = {};

			let result = await GetAllChat(query);

			const buyerChats = [];
			const sellerChats = [];
			const reqChats = [];

			result.forEach((item) => {
				buyerChats.push(item);

				if (item.isFriends) sellerChats.push(item);
				else reqChats.push(item);
			});

			setChatRequests([...reqChats]);

			const chatList = [...buyerChats, ...sellerChats];
			setChats(chatList);

			if (type === "previous") {
				setIsChatsLoading(false);

				return;
			}

			if (!!location.state && !!!activeChat) {
				setActiveChat(chatList.find((item) => item.slug === location.state.chat.slug));
			} else if (!activeChat && isDataExists(chatList)) {
				setActiveChat(chatList[0]);
			}

			setIsChatsLoading(false);
		} catch (err) {
			failureToaster(err.message);
		}
	};

	useEffect(() => {
		getAllChat();
	}, []);

	useEffect(() => {
		getAllChat();
	}, [location.state]);



	return (
		<>
			<div className="container py-lg-4 mb-4 mb-0">
				<div className="row">
					<div className="col-lg-4 col-md-5">
						<div className={`card-box px-0 scroll-list ${chatList ? "d-block" : "d-md-block d-none"}`}>
							{isChatsLoading && (
								<div className="h-100 centered">
									<CustomSpinner color="primary" isBig={true} extraClasses="" />
								</div>
							)}
							{!isChatsLoading && (
								<ChatGroupSide
									getAllChat={getAllChat}
									chats={chats}
									chatRequests={chatRequests}
									activeChat={activeChat}
									setActiveChat={setActiveChat}
									setActiveChatTab={setActiveChatTab}
									activeChatTab={activeChatTab}
									setChatList={setChatList}
									chatList={chatList}
									setChats={setChats}
								/>
							)}
						</div>
					</div>

					<div className="col-lg-8 col-md-7">
						<MessageContainer
							chatList={chatList}
							setChatList={setChatList}
							activeChat={activeChat}
							getAllChat={getAllChat}
							activeChatTab={activeChatTab}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
