import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { MemeState } from '../../../types/States';
import type { Meme } from '../../../types/Meme';

const initialState: MemeState = {
	renameMemeModal: {
		show: false,
		name: '',
		memeId: '',
	},
};

export const memeSlice = createSlice({
	name: 'meme',
	initialState,
	reducers: {
		openRenameMemeModal: (state, actions: PayloadAction<Meme>) => {
			state.renameMemeModal.show = true;
			state.renameMemeModal.memeId = actions.payload.uuid;
			state.renameMemeModal.name = actions.payload.name;
		},
		closeRenameMemeModal: (state) => {
			state.renameMemeModal.show = false;
			state.renameMemeModal.memeId = '';
			state.renameMemeModal.name = '';
		},
	},
});

export const { openRenameMemeModal, closeRenameMemeModal } = memeSlice.actions;
