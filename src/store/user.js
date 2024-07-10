import { create } from "zustand";

export const userStore = create((set) => ({
	loggedInUser: null,
	msgCount: 0,

	setAuth: async (state) => {
		await set({ loggedInUser: state });
		localStorage.setItem("token", state.access_token);
		localStorage.setItem("refresh_token", state.refresh_token);
	},
	

	purgeAuth: () => {
		set({ loggedInUser: null });
		localStorage.removeItem("token");
	},

	readCountMsg: () => {
		set((state) => ({ msgCount: state.msgCount + 1 }));
	},
	resetMsgCount: () => {
		set({ msgCount: 0 });
	},
}));
