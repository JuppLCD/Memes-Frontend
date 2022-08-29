import { ChangeEvent, FormEvent, useState } from 'react';
import { URL_API_BACKEND } from '../../config';
import { useNotification } from '../../hooks/useNotification';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { userCreteMeme } from '../../store/slices/meme/MemeSlice';

import { FormMeme as FormMemeInterface } from '../../types/Form';

import Form from './../FormElemets';

function FormMeme() {
	const initialTextMeme = { text: 'Your text here', x: 0, y: 0, fs: 16, id: `uuid` };
	const initialState: FormMemeInterface = {
		name: '',
		access: 'false',
		file: null,
		image_url: undefined,
		template: undefined,
		texts: undefined,
	};

	const [inputsData, setInputsData] = useState<FormMemeInterface>(initialState);
	const UserState = useReduxSelector((state) => state.user);

	const dispatch = useReduxDispatch();

	const { notifyError, notifyLoading, notifySuccess } = useNotification();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputsData((prevState: FormMemeInterface) => {
			if (name === 'file' && e.target.files) {
				const supportType = ['image/png', 'image/jpg', 'image/jpeg'];
				const file = e.target.files[0];

				if (!file) {
					return prevState;
				}

				if (supportType.includes(file.type)) {
					return {
						...prevState,
						file,
						image_url: URL.createObjectURL(file),
						texts: [{ ...initialTextMeme, id: `${new Date().getTime()}_id` }],
					};
				} else {
					notifyError('Invalid file type, valid types are: png, jpg, jpeg');
					return prevState;
				}
			}

			if (name.includes('textMeme') && prevState.texts) {
				type keysTextMeme = 'text' | 'x' | 'y' | 'fs';
				const id_textMeme = name.split('-')[2];
				const type_textMeme: keysTextMeme = name.split('-')[1] as keysTextMeme;

				const i_textMeme = prevState.texts?.findIndex((textMeme) => textMeme.id === id_textMeme);

				if (i_textMeme < 0) {
					return prevState;
				}
				const updateTextMeme = { ...prevState.texts[i_textMeme] };
				const newStateTexts = prevState.texts.filter((textMeme) => textMeme.id !== id_textMeme);

				if (type_textMeme === 'text') {
					updateTextMeme[type_textMeme] = value;
				} else {
					updateTextMeme[type_textMeme] = Number(value) < 0 ? 0 : Number(value);
				}

				return { ...prevState, texts: [...newStateTexts, updateTextMeme] };
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

	const addNewTextMeme = () => {
		setInputsData((prevState: FormMemeInterface) => {
			return {
				...prevState,
				texts: [...(prevState.texts ?? []), { ...initialTextMeme, id: `${new Date().getTime()}_id` }],
			};
		});
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
					<input type='file' name='file' accept='image/png, image/jpg, image/jpeg' onChange={handleChange} />
				</label>
			</div>

			<div>
				{inputsData.image_url && (
					<>
						<div className='relative'>
							<img src={inputsData.image_url} alt='create meme' className='relative w-100' />
							{inputsData.texts?.map((textMeme) => (
								<div
									key={textMeme.id}
									className='absolute'
									style={{ bottom: textMeme.y, left: textMeme.x, fontSize: textMeme.fs }}
								>
									{textMeme.text}
								</div>
							))}
						</div>
						<button onClick={addNewTextMeme}>Add text</button>
						<ul>
							{inputsData.texts?.map((textMeme) => (
								<li key={textMeme.id}>
									Texto 1:
									<input
										type='text'
										name={`textMeme-text-${textMeme.id}`}
										value={textMeme.text}
										onChange={handleChange}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2'
									/>
									X:
									<input
										type='number'
										name={`textMeme-x-${textMeme.id}`}
										value={textMeme.x}
										onChange={handleChange}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2'
									/>
									Y:
									<input
										type='number'
										name={`textMeme-y-${textMeme.id}`}
										value={textMeme.y}
										onChange={handleChange}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2'
									/>
									Font-size:
									<input
										type='number'
										name={`textMeme-fs-${textMeme.id}`}
										value={textMeme.fs}
										onChange={handleChange}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2'
									/>
								</li>
							))}
						</ul>
					</>
				)}
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
