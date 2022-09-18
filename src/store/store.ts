import { configureStore } from '@reduxjs/toolkit';

// Slices
import { userSlice } from './slices/user/UserSlice';
import { memeSlice } from './slices/meme/MemeSlice';

// Services
import { MemesTemplateAPI } from '../services/MemesTemplate';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		memes: memeSlice.reducer,

		[MemesTemplateAPI.reducerPath]: MemesTemplateAPI.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(MemesTemplateAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
