import { useEffect, useState } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useGetMemeByIdMutation } from '../services/MemesBackend';

import { API_MEMES_TEMPLATE_IMG } from '../config';

import Container from '../components/Container';
import FormMeme from '../components/FormMeme';

import type { FormMeme as FormMemeType } from '../types/Form';

const initialState: FormMemeType = {
	name: '',
	access: 'false',
	file: null,
	image_url: undefined,
	texts: undefined,
};

function FormMemePage() {
	const [inputsDataDefoult, setInputsDataDefoult] = useState(initialState);

	const [getMemeById, { isError, isLoading }] = useGetMemeByIdMutation();

	const { meme_id } = useParams();

	const [query] = useSearchParams();
	const name_img = query.get('name_img');
	const format = query.get('format');

	const location = useLocation();
	const path = location.pathname;
	const isEditPath = path.includes('/edit');

	if (isEditPath && !meme_id) {
		return <p>Error: No es posible editar un meme sin el id</p>;
	}

	useEffect(() => {
		if (isEditPath && meme_id) {
			(async () => {
				const data = await getMemeById(meme_id).unwrap();

				const meme = data[0];
				if (meme.template === null) {
					return;
				}
				setInputsDataDefoult({
					name: meme.name,
					access: `${meme.access}`,
					file: null,
					image_url: meme.template as string,
					texts: meme.texts,
				});
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
				<FormMeme defaultState={inputsDataDefoult} idMemeToEdit={meme_id} />
			</Container>
		</main>
	);
}

export default FormMemePage;
