import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URL_API_BACKEND } from './../config';

import type { Meme } from '../types/Meme';
import { RootState } from '../store';

export const MemesBackendAPI = createApi({
	reducerPath: 'MemesBackendAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${URL_API_BACKEND}/meme`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).user.token;

			if (token) {
				headers.set('authorization', token);
			}

			return headers;
		},
	}),

	tagTypes: ['UserMeme', 'PublicMeme'],

	endpoints: (builder) => ({
		getUserMemes: builder.query<Meme[], undefined>({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
			providesTags: ['UserMeme'],
		}),
		getPublicMemes: builder.query<Meme[], undefined>({
			query: () => ({
				url: '/public',
				method: 'GET',
			}),
			providesTags: ['PublicMeme'],
		}),

		newMeme: builder.mutation<Meme, FormData>({
			query: (newMeme: FormData) => ({
				url: '/create',
				method: 'POST',
				body: newMeme,
			}),
			invalidatesTags: ['UserMeme', 'PublicMeme'],
			extraOptions: { maxRetries: 0 },
		}),

		deleteMeme: builder.mutation<null, string>({
			query: (memeId: string) => ({
				url: `/delete/${memeId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['UserMeme', 'PublicMeme'],
			extraOptions: { maxRetries: 0 },
		}),
	}),
});

export const { useGetPublicMemesQuery, useGetUserMemesQuery, useNewMemeMutation, useDeleteMemeMutation } =
	MemesBackendAPI;
