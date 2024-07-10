import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { SocketContext, socket } from "./socket";

import "swiper/css";
import "swiper/css/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";

import "./App.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	// </React.StrictMode>
	<SocketContext.Provider value={socket}>
		<App />
	</SocketContext.Provider>
);
