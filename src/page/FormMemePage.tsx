import { useEffect, useState } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import Container from '../components/Container';
import FormMeme from '../components/FormMeme';
import { API_MEMES_TEMPLATE_IMG, LOCAL_STORAGE_KEY_TOKEN, URL_API_BACKEND } from '../config';
import { useLocalStorage } from '../hooks/useStorage';

import { FormMeme as FormMemeType } from '../types/Form';

const initialState: FormMemeType = {
	name: '',
	access: 'false',
	file: null,
	image_url: undefined,
	template: undefined,
	texts: undefined,
};

function FormMemePage() {
	const [inputsDataDefoult, setInputsDataDefoult] = useState(initialState);
	const [accessToken] = useLocalStorage(LOCAL_STORAGE_KEY_TOKEN, '');

	const { meme_id } = useParams();

	const [query] = useSearchParams();
	const name_img = query.get('name_img');
	const format = query.get('format');

	const location = useLocation();
	const path = location.pathname;

	if (path.includes('/edit') && meme_id === undefined) {
		return <p>Error: No es posible editar un meme sin el id</p>;
	}

	useEffect(() => {
		// if (
		// 	inputsDataDefoult.file ||
		// 	inputsDataDefoult.image_url ||
		// 	inputsDataDefoult.template ||
		// 	inputsDataDefoult.texts
		// ) {
		// 	return;
		// }
		if (path.includes('/edit')) {
			// TODO: Traer la info del meme
			(async () => {
				const res = await fetch(`${URL_API_BACKEND}/meme/${meme_id}`, {
					headers: {
						authorization: accessToken,
					},
				});
				const data = await res.json();
				console.log(data);
			})();
		} else if (name_img && format) {
			setInputsDataDefoult((prevInputsData) => ({
				...prevInputsData,
				image_url: `${API_MEMES_TEMPLATE_IMG}/${name_img}.${format}`,
			}));
		}
	}, []);

	return (
		<main>
			<Container>
				<FormMeme defaultState={inputsDataDefoult} />
			</Container>
		</main>
	);
}

export default FormMemePage;
