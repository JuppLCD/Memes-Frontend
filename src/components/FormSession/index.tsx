import { ChangeEvent, FormEvent, useState } from 'react';

import { LOCAL_STORAGE_KEY_TOKEN, URL_API_BACKEND } from '../../config';

import { useNotification } from '../../hooks/useNotification';
// import { useLocalStorage } from '../../hooks/useStorage';

// REDUX
import { useReduxDispatch } from '../../store';
import { login } from '../../store/slices/user/UserSlice';

import { FormUser } from '../../types/Form';

import Form from '../Form';

import { getInputsProps, initialState } from './data';

interface Props {
	path: 'login' | 'register';
}

function FormSession({ path }: Props) {
	const [inputsData, setInputsData] = useState<FormUser>(initialState);
	const { notifySuccess, notifyLoading, notifyError } = useNotification();
	// const [tokenLocalStorage, setTokenLocalStorage] = useLocalStorage(LOCAL_STORAGE_KEY_TOKEN, '');

	const dispach = useReduxDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputsData((prevState: FormUser) => {
			if (e.target.type === 'checkbox') {
				return {
					...prevState,
					[name]: e.target.checked,
				};
			}

			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			notifyLoading();

			const JSON_TO_SEND =
				path === 'login'
					? { email: inputsData.email, password: inputsData.password }
					: {
							email: inputsData.email,
							password: inputsData.password,
							name: inputsData.name,
							passwordConfirm: inputsData.passwordConfirm,
					  };

			const res = await fetch(`${URL_API_BACKEND}/user/${path}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(JSON_TO_SEND),
			});

			// ! Debo validar la data
			const data = await res.json();

			if (data.error) {
				notifyError('Error: ' + data.message);
				return;
			}
			dispach(login(data));

			if (path === 'login') {
				notifySuccess('Login successfully');
			} else {
				notifySuccess('Registration was successful');
			}

			if (inputsData.rememberMe) {
				// TODO: VER PORQE NO ME FUNCIONA EL setTokenLocalStorage(data.accessToken) del hook useLocalStorage
				// setTokenLocalStorage(data.accessToken);
				localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(data.accessToken));
			}
		} catch (err) {
			console.error(err);
		}
	};

	const { inputsPropsRegister, inputsPropsLogin } = getInputsProps(inputsData);

	const titleForm = path === 'login' ? 'Log In' : 'Register';

	return (
		<Form title={titleForm} onSubmit={handleSubmit}>
			<div>
				{path === 'login'
					? inputsPropsLogin.map((infoInput) => (
							<div className='mb-6'>
								<Form.InputLabel key={infoInput.name} {...infoInput} onChange={handleChange} />
							</div>
					  ))
					: inputsPropsRegister.map((infoInput) => (
							<div className='mb-6'>
								<Form.InputLabel key={infoInput.name} {...infoInput} onChange={handleChange} />
							</div>
					  ))}
			</div>

			<div className='flex items-start mb-6'>
				<label className='text-sm font-medium text-gray-300 flex'>
					<input
						type='checkbox'
						name='rememberMe'
						checked={inputsData.rememberMe}
						onChange={handleChange}
						className='w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 mr-2'
					/>
					Remember me
				</label>
			</div>
			<button
				type='submit'
				className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center '
			>
				Submit
			</button>
		</Form>
	);
}

export default FormSession;
