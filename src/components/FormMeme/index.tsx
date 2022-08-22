import { ChangeEvent, FormEvent, useState } from 'react';
import { URL_API_BACKEND } from '../../config';
import { useReduxSelector } from '../../store';

export interface Meme {
	name: string;
	access: 'false' | 'true';
	file: File | null;
}

function FormMeme() {
	const initialState: Meme = {
		name: '',
		access: 'false',
		file: null,
	};

	const [inputsData, setInputsData] = useState<Meme>(initialState);

	const UserState = useReduxSelector((state) => state.user);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let { name, value }: { name: string; value: string | null | File } = e.target;

		setInputsData((prevState: Meme) => {
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
			console.log('INPUTDATA => ', inputsData);
			const formData = new FormData();
			formData.append('name', inputsData.name);
			formData.append('file', inputsData.file as File);
			formData.append('access', inputsData.access);

			const res = await fetch(URL_API_BACKEND + '/meme/create', {
				method: 'POST',
				headers: {
					mode: 'no-cors',
					authorization: UserState.token as string,
				},
				body: formData,
			});
			const data = await res.json();
			console.log('RESPONSE DATA => ', data);
		} else {
			alert('Error: rellene los campos');
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
