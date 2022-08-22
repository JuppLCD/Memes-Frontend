import { useEffect, useState } from 'react';
import { URL_API_BACKEND, URL_BACKEND } from '../../config';
import { useReduxSelector } from '../../store';
import { Meme } from '../../types/Meme';

interface Props {
	to: '/' | '/public';
}

function GridMemes({ to }: Props) {
	const UserState = useReduxSelector((state) => state.user);

	const [memes, setMemes] = useState<Meme[]>();

	useEffect(() => {
		if (UserState.token && memes === undefined) {
			(async () => {
				const res = await fetch(URL_API_BACKEND + '/meme' + to, {
					method: 'GET',
					headers: {
						mode: 'no-cors',
						authorization: UserState.token as string,
					},
				});

				const data: Meme[] = await res.json();
				setMemes(data);
			})();
		}
	}, [UserState.token, memes]);

	return (
		<div>
			{memes !== undefined && memes.length !== 0 ? (
				memes.map((meme) => (
					<div key={meme.uuid}>
						<img src={`${URL_BACKEND}/storage/imgs/${meme.path_image}`} style={{ width: 300 }} />
					</div>
				))
			) : (
				<p>No hay memes</p>
			)}
		</div>
	);
}

export default GridMemes;
