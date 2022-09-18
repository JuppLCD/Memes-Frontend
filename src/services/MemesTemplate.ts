import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_MEMES_TEMPLATE_MEMES } from './../config';

import type { APIResMemeTemplate } from '../types/services';

export const MemesTemplateAPI = createApi({
	reducerPath: 'MemesTemplateAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_MEMES_TEMPLATE_MEMES }),
	// keepUnusedDataFor: 60,

	// EndPoints
	endpoints: (builder) => ({
		getMemesTemplate: builder.query<APIResMemeTemplate, undefined>({
			query: () => ({ url: '', method: 'GET' }),
		}),
	}),
});

export const { useGetMemesTemplateQuery } = MemesTemplateAPI;
