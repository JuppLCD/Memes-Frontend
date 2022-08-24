import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './slices/user/UserSlice';
import { memeSlice } from './slices/meme/MemeSlice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		memes: memeSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
