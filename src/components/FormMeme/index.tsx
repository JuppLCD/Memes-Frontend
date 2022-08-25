import { ChangeEvent, FormEvent, useState } from 'react';
import { URL_API_BACKEND } from '../../config';
import { useNotification } from '../../hooks/useNotification';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { userCreteMeme } from '../../store/slices/meme/MemeSlice';

import { FormMeme as FormMemeInterface } from '../../types/Form';

function FormMeme() {
	const initialState: FormMemeInterface = {
		name: '',
		access: 'false',
		file: null,
	};

	const [inputsData, setInputsData] = useState<FormMemeInterface>(initialState);
	const UserState = useReduxSelector((state) => state.user);

	const dispatch = useReduxDispatch();

	const { notifyError, notifyLoading, notifySuccess } = useNotification();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let { name, value }: { name: string; value: any } = e.target;

		setInputsData((prevState: FormMemeInterface) => {
			if (name === 'file') {
				if (e.target.files) {
					value = e.target.files[0];
				}
			}
			return {
				...prevState,
				[name]: value,
			};
		});
	};

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
		<form onSubmit={handleSubmit} encType='multipart/form-data'>
			<h2>FORM MEME</h2>
			<div>
				<label>
					<h4>Name:</h4>
					<input type='text' name='name' value={inputsData.name} onChange={handleChange} />
				</label>
			</div>
			<div>
				<h4>Access:</h4>
				<label>
					<input
						type='radio'
						name='access'
						value='true'
						onChange={handleChange}
						checked={inputsData.access === 'true'}
					/>
					Public
				</label>
				<label>
					<input
						type='radio'
						name='access'
						value='false'
						onChange={handleChange}
						checked={inputsData.access === 'false'}
					/>
					Private
				</label>
			</div>
			<div>
				<label>
					<h4>Meme</h4>
					<input type='file' name='file' accept='image/*' onChange={handleChange} />
				</label>
			</div>
			<button type='submit'>Save</button>
		</form>
	);
}

export default FormMeme;
