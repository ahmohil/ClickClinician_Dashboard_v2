import React, { Fragment, useContext, useEffect, useRef, useState } from "react";

import {
	deleteNotification,
	getNotifications,
	markAllNotifications,
	readNotification,
	unreadNotification,
} from "../../services/Notification.Service";

import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/user";
import { failureToaster, isDataExists } from "../../utils";
import { daysAgo } from "@transformers";
// import { SocketContext } from "../../socket";
import NoData from "./NoData";
import { DateFormatter } from "../../transformers/DateFormatter";

const Notifications = () => {
	const socket = useContext(SocketContext);

	const loggedInUser = userStore((state) => state.loggedInUser);

	const navigate = useNavigate();

	const notificationsRef = useRef();
	const [notifications, setNotifications] = useState([]);
	const [notificationsCount, setNotificationsCount] = useState("");
	const [isShow, setIsShow] = useState(false);

	const getAllNotifications = async () => {
		try {
			const response = await getNotifications();
			setNotifications(response);
			setNotificationsCount(notifications?.docs?.filter((notification) => !notification.isRead).length);
		} catch (error) {
			failureToaster(error.message);
		}
	};

	const readSelectedNotification = async (id, notif) => {
		const handleBooking = () => {
			navigate(`/services/details/${notif?.booking?.service?.slug}`, {
				state: { booking: notif?.booking?.slug },
			});
			setIsShow(false);
		};

		const handleSupportNavigation = () => {
			navigate(`/my-tickets`);
			setIsShow(false);
		};

		const handleAddMeetingLink = () => {
			navigate(`/services/details/${notif?.booking?.service?.slug}`, {
				state: { booking: notif?.booking?.slug, addLink: true },
			});
			setIsShow(false);
		};

		const handleAddReview = () => {
			navigate(`/services/details/${notif?.booking?.service?.slug}`, {
				state: { booking: notif?.booking?.slug },
			});
			setIsShow(false);
		};

		const handleEarning = () => {
			navigate("/earnings");
			setIsShow(false);
		};
		const handleReview = () => {
			navigate("/bookings");
			setIsShow(false);
		};

		try {
			if (notif.title == "booking-status-changed") handleBooking();
			if (notif.title == "support-update") handleSupportNavigation();
			if (notif.title == "meeting-link") handleAddMeetingLink();
			if (notif.title == "Review") handleAddReview();
			if (notif.title == "booking-created") handleBooking();
			if (notif.title == "booking-reschedule") handleBooking();
			if (notif.title == "booking-completed") handleBooking();
			if (notif.title == "amount-withdrawl") handleEarning();
			if (notif.title == "refund-amount-coming") handleEarning();
			if (notif.title == "refund-processed") handleEarning();
			if (notif.title == "ask-review") handleAddReview();
			if (notif.title == "meeting-link-added") handleAddReview();
			if (notif.title == "booking-verified") handleBooking();
			if (notif.title == "reschedule-request") handleBooking();
			if (notif.title == "payment-release") handleEarning();

			await readNotification(id);
			getAllNotifications();
		} catch (error) {
			failureToaster(error.message);
		}
	};

	const unreadSelectedNotification = async (id) => {
		try {
			await unreadNotification(id);
			getAllNotifications();
		} catch (error) {
			failureToaster(error.message);
		}
	};

	const ReadAllNotifications = async () => {
		try {
			await markAllNotifications();
			getAllNotifications();
		} catch (error) {
			failureToaster(error.message);
		}
	};

	const deleteSelectedNotification = async (id) => {
		try {
			await deleteNotification(id);
			getAllNotifications();
		} catch (error) {
			failureToaster(error.message);
		}
	};

	useEffect(() => {
		if (!!loggedInUser) {
			getAllNotifications();
		}

		if (!!loggedInUser) {
			socket?.on("notify-" + loggedInUser?._id, (notification) => {
				getAllNotifications();
			});
		}
		return () => {
			socket?.off(`notify-" + ${loggedInUser?._id}`);
		};
	}, [loggedInUser]);

	useEffect(() => {
		setNotificationsCount(notifications?.docs?.filter((notification) => !notification.isRead).length);
	}, [notifications, setNotificationsCount]);

	return (
		<>
			<ul>
				<li>
					<a onClick={() => setIsShow(!isShow)} className="position-relative ">
						<div className="noti pointer">
							<span className="fs-22 noti-icon">
								{" "}
								<span className="iconify" data-icon="radix-icons:bell"></span>
							</span>
							{/* <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6 28.5V25.5H9V15C9 12.925 9.625 11.081 10.875 9.468C12.125 7.855 13.75 6.799 15.75 6.3V5.25C15.75 4.625 15.969 4.0935 16.407 3.6555C16.845 3.2175 17.376 2.999 18 3C18.625 3 19.1565 3.219 19.5945 3.657C20.0325 4.095 20.251 4.626 20.25 5.25V6.3C22.25 6.8 23.875 7.8565 25.125 9.4695C26.375 11.0825 27 12.926 27 15V25.5H30V28.5H6ZM18 33C17.175 33 16.4685 32.706 15.8805 32.118C15.2925 31.53 14.999 30.824 15 30H21C21 30.825 20.706 31.5315 20.118 32.1195C19.53 32.7075 18.824 33.001 18 33Z"
								fill="#09A6A3"
							/>
						</svg> */}
							{isDataExists(notificationsCount) && (
								<div className="notification-number">{`${notificationsCount > 9 ? `9+` : notificationsCount}`}</div>
							)}
						</div>
					</a>
				</li>
			</ul>

			{isShow && (
				<>
					<div className="close-box" onClick={() => setIsShow(false)}></div>
					<div className="notify-boxs notification-sm" ref={notificationsRef}>
						<div className="notify-head px-2 py-2 d-flex justify-content-between position-relative">
							<div className="fs-18 fw-700 ">Notifications</div>
							<div className="d-flex align-items-center gap-2">
								{isDataExists(notifications.docs) && (
									<div className="fw-600 primary-text pointer" onClick={() => ReadAllNotifications()}>
										Read All
									</div>
								)}
							</div>
							{/* <div className="arrow-tri"></div> */}
						</div>
						{isDataExists(notifications?.docs) && (
							<Fragment>
								<div className="noti-main">
									{notifications?.docs?.map((notif) => (
										<div className={`notification-item ${!notif.isRead ? "highlighted" : ""}`} key={notif._id}>
											<div key={notif._id} className="d-flex  justify-content-between px-3 py-2 gap-3 ">
												<div
													className="notify-image pointer"
													onClick={() => readSelectedNotification(notif._id, notif)}>
													<img src={loggedInUser.profileImage} alt="" />
												</div>
												<div className="flex-1">
													<div className="d-flex justify-content-between">
														<div className="fs-14 fw-500">
															<span className="pointer" onClick={() => readSelectedNotification(notif._id, notif)}>
																{notif.description}
															</span>
														</div>

														<Dropdown className="dots-modal">
															<Dropdown.Toggle variant="success" id="dropdown-basic">
																<div className="fs-20">
																	<iconify-icon icon="ph:dots-three-vertical-bold"></iconify-icon>{" "}
																</div>
															</Dropdown.Toggle>

															<Dropdown.Menu>
																<Dropdown.Item
																	href=""
																	onClick={() =>
																		notif.isRead
																			? unreadSelectedNotification(notif._id)
																			: readSelectedNotification(notif._id, notif)
																	}>
																	{notif.isRead ? "Mark as unread" : "Mark as Read"}
																</Dropdown.Item>
																<Dropdown.Item href="#/action-2" onClick={() => deleteSelectedNotification(notif._id)}>
																	Delete
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</div>
													<div className="d-flex justify-content-between align-items-center">
														<div className="text-black fs-12 fw-300 mt-1 break-all">
															{DateFormatter(notif?.createdAt)}
														</div>
														<div className="text-black fs-12 fw-300 mt-1">{daysAgo(notif?.createdAt)}</div>
													</div>
												</div>
											</div>
											<hr className="br-1 " />
										</div>
									))}
								</div>
							</Fragment>
						)}

						{!isDataExists(notifications?.docs) && (
							<NoData message="No notifications to display. Check back later for updates." extraClasses="fs-16 p-4 " />
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Notifications;
