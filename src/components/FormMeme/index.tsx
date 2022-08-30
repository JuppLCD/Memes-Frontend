import { FormEvent } from 'react';

import { URL_API_BACKEND } from '../../config';

import { useReduxDispatch, useReduxSelector } from '../../store';
import { userCreteMeme } from '../../store/slices/meme/MemeSlice';

import { useFormMemeReducer } from './hooks/useReducer';
import { useNotification } from '../../hooks/useNotification';

import Form from '../Form';
import { ButtonGradientPurpleToBlue } from '../Buttons';
import PreviewTextMeme from './PreviewTextMeme';

function FormMeme() {
	const {
		state: inputsData,
		handleChangeInput,
		handleChangeFile,
		handleChangeTextMeme,
		addNewTextMeme,
	} = useFormMemeReducer();

	const UserState = useReduxSelector((state) => state.user);
	const dispatch = useReduxDispatch();

	const { notifyError, notifyLoading, notifySuccess } = useNotification();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputsData.file !== null && inputsData.name && inputsData.access) {
			const formData = new FormData();
			formData.append('name', inputsData.name);
			formData.append('file', inputsData.file as File);
			formData.append('access', inputsData.access);

			notifyLoading();
			try {
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
				dispatch(userCreteMeme(data));
				notifySuccess('Meme created successfully');
			} catch (err) {
				console.error(err);
				notifyError('Error to create meme');
			}
		} else {
			notifyError('All fields are required');
		}
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
				{inputsData.image_url && (
					<PreviewTextMeme
						inputsData={inputsData}
						handleChangeTextMeme={handleChangeTextMeme}
						addNewTextMeme={addNewTextMeme}
					/>
				)}
			</div>
			<ButtonGradientPurpleToBlue type='submit'>Save</ButtonGradientPurpleToBlue>
		</Form>
	);
}

export default FormMeme;
