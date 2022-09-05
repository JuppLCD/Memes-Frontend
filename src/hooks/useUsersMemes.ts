import { useEffect } from 'react';
import { URL_API_BACKEND } from '../config';
import { useReduxDispatch, useReduxSelector } from '../store';
import { setPublicMemes, setUserMemes } from '../store/slices/meme/MemeSlice';
import { useNotification } from './useNotification';

import { Meme } from '../types/Meme';

export default function useUsersMemes(to: '/' | '/public') {
	const state = useReduxSelector((state) => state);
	const dispach = useReduxDispatch();

	const { notifyError } = useNotification();

	useEffect(() => {
		const getMemesUser = to === '/' && state.memes.userMemes === undefined;
		const getMemesPublic =
			to === '/public' &&
			(state.memes.publicMemes === undefined || state.memes.publicMemes?.expireTime < new Date().getTime());

		if (state.user.token && (getMemesUser || getMemesPublic)) {
			(async () => {
				try {
					const res = await fetch(URL_API_BACKEND + '/meme' + to, {
						method: 'GET',
						headers: {
							mode: 'no-cors',
							authorization: state.user.token as string,
						},
					});

					const data: Meme[] = await res.json();
					if (to === '/') {
						dispach(setUserMemes(data));
					} else {
						dispach(setPublicMemes(data));
					}
				} catch (err) {
					const msgError = `An error occurred while searching for ${to === '/' ? "the user's" : 'public'} memes`;
					notifyError(msgError);
				}
			})();
		}
	}, [state.user.token, state.memes.publicMemes?.memes, state.memes.userMemes]);

	const memes = to === '/' ? state.memes.userMemes : state.memes.publicMemes?.memes;

	return memes;
}
