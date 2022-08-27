import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../../types/States';

const initialState: UserState = {
	isAuth: false,
	token: null,
	userInfo: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuth = true;
		},

		setInfoUser: (state, action: PayloadAction<{ name: string; email: string; id: string }>) => {
			state.userInfo = action.payload;
		},
		login: (
			state,
			action: PayloadAction<{ userInfo: { name: string; email: string; id: string }; accessToken: string }>
		) => {
			state.token = action.payload.accessToken;
			state.userInfo = action.payload.userInfo;
			state.isAuth = true;
		},

		logout: (state) => {
			state.userInfo = undefined;
			state.isAuth = false;
			state.token = null;
		},
	},
});

export const { setToken, setInfoUser, login, logout } = userSlice.actions;
