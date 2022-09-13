import { FormEvent, useRef } from 'react';

import { API_MEMES_TEMPLATE_IMG, URL_API_BACKEND } from '../../config';

import { useReduxDispatch, useReduxSelector } from '../../store';
import { userCreteMeme } from '../../store/slices/meme/MemeSlice';

import { useFormMemeReducer } from './hooks/useReducer';
import { useNotification } from '../../hooks/useNotification';

import { FormMeme as FormMemeType } from '../../types/Form';

import Form from '../Form';
import PreviewTextMeme from './PreviewTextMeme';
import { ButtonPinkToOrange, ButtonPurpleToBlue } from '../Buttons';
import { canvasImgMeme } from './utils/canvas';

interface Props {
	defaultState: FormMemeType;
	idMemeToEdit?: string;
}

function FormMeme({ defaultState, idMemeToEdit }: Props) {
	const {
		state: inputsData,
		handleChangeInput,
		handleChangeFile,
		handleChangeTextMeme,
		addNewTextMeme,
		deleteTextMeme,
	} = useFormMemeReducer(defaultState);

	const UserState = useReduxSelector((state) => state.user);
	const dispatch = useReduxDispatch();

	const { notifyError, notifyLoading, notifySuccess } = useNotification();

	const imgMemeRef = useRef<HTMLImageElement>();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!(inputsData.name && inputsData.access)) {
			notifyError('All fields are required');
			return;
		}
		const canvas = canvasImgMeme(inputsData, imgMemeRef);

		if (!canvas) {
			// ! TIRRAR UN ERROR
			console.error('No se pudo crear el canvas al guardar la imagen');
			return;
		}

		canvas.toBlob(async (Blob) => {
			if (!Blob) {
				console.error('No se pudo crear el objeto Blob utilizando canvas');
				return;
			}

			const formData = new FormData();
			formData.append('name', inputsData.name);
			formData.append('file', Blob, inputsData.file?.name || inputsData.name + '.png');
			formData.append('access', inputsData.access);

			if (inputsData.image_url?.includes(API_MEMES_TEMPLATE_IMG)) {
				const template = {
					url: inputsData.image_url,
					texts: inputsData.texts,
				};
				formData.append('template', JSON.stringify(template));
			}

			notifyLoading();
			try {
				// TODO: Utilizar el idMemeToEdit para saber cuando se esta editando y cambiar la url
				const res = await fetch(URL_API_BACKEND + '/meme/create', {
					method: 'POST',
					headers: {
						mode: 'no-cors',
						authorization: UserState.token as string,
					},
					body: formData,
				});
				// ! Se debe hacer validaciones de lo que entra
				const data = await res.json();
				if (res.ok) {
					dispatch(userCreteMeme(data));
					notifySuccess('Meme created successfully');
				} else {
					throw Error(data);
				}
			} catch (err) {
				console.error(err);
				notifyError('Error to create meme');
			}
		});
	};

	const handleDownload = () => {
		const canvas = canvasImgMeme(inputsData, imgMemeRef);
		if (!canvas) return;

		const link = document.createElement('a');
		const nameImage = inputsData.name.trim() === '' ? 'meme' : inputsData.name.trim();
		link.download = nameImage + '.png';

		link.href = canvas.toDataURL();
		link.click();
	};

	return (
		<Form onSubmit={handleSubmit} encType='multipart/form-data' title='Create Meme'>
			<div className='mb-6'>
				<Form.InputLabel label='Name:' type='text' name='name' value={inputsData.name} onChange={handleChangeInput} />
			</div>
			<div className='mb-6'>
				<Form.InputRadio
					title='Access:'
					name='access'
					handleChange={handleChangeInput}
					check={inputsData.access}
					inputs={[
						{ label: 'Public', value: 'true' },
						{ label: 'Private', value: 'false' },
					]}
				/>
			</div>
			<div>
				<label>
					<h4>Meme</h4>
					<input type='file' name='file' accept='image/png, image/jpg, image/jpeg' onChange={handleChangeFile} />
				</label>
			</div>
			<div>
				{inputsData.image_url !== undefined && (
					<PreviewTextMeme
						inputsData={inputsData}
						handleChangeTextMeme={handleChangeTextMeme}
						addNewTextMeme={addNewTextMeme}
						deleteTextMeme={deleteTextMeme}
						imgMemeRef={imgMemeRef}
					/>
				)}
			</div>
			<div className='mt-3'>
				<ButtonPurpleToBlue disabled={inputsData.image_url === undefined} type='submit'>
					Save
				</ButtonPurpleToBlue>

				<ButtonPinkToOrange type='button' disabled={inputsData.image_url === undefined} onClick={handleDownload}>
					Download
				</ButtonPinkToOrange>
			</div>
		</Form>
	);
}

export default FormMeme;
