import { ChangeEvent, FormEvent, useState } from 'react';
import { URL_API_BACKEND } from '../../config';
import { useNotification } from '../../hooks/useNotification';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { userCreteMeme } from '../../store/slices/meme/MemeSlice';

import { FormMeme as FormMemeInterface } from '../../types/Form';

import Form from './../FormElemets';

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
		<Form onSubmit={handleSubmit} encType='multipart/form-data' title='Create Meme'>
			<div className='mb-6'>
				<Form.InputLabel label='Name:' type='text' name='name' value={inputsData.name} onChange={handleChange} />
			</div>
			<div className='mb-6'>
				<Form.InputRadio
					title='Access:'
					name='access'
					handleChange={handleChange}
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
					<input type='file' name='file' accept='image/*' onChange={handleChange} />
				</label>
			</div>

			<button
				className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 '
				type='submit'
			>
				<span className='relative px-5 py-2 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0'>
					Save
				</span>
			</button>
		</Form>
	);
}

export default FormMeme;
