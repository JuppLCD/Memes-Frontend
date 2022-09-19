import { configureStore } from '@reduxjs/toolkit';

// Slices
import { userSlice } from './slices/user/UserSlice';
import { memeSlice } from './slices/meme/MemeSlice';

// Services
import { MemesTemplateAPI } from '../services/MemesTemplate';
import { MemesBackendAPI } from '../services/MemesBackend';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		memes: memeSlice.reducer,

		[MemesTemplateAPI.reducerPath]: MemesTemplateAPI.reducer,
		[MemesBackendAPI.reducerPath]: MemesBackendAPI.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(MemesTemplateAPI.middleware, MemesBackendAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
