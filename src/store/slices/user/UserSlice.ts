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

		logout: (state) => {
			state.userInfo = undefined;
			state.isAuth = false;
			state.token = null;
		},
	},
});

export const { setToken, setInfoUser, logout } = userSlice.actions;
