import { ChangeEvent, FormEvent, useState } from 'react';
import { URL_API_BACKEND } from '../../config';
import { useNotification } from '../../hooks/useNotification';

// REDUX
import { useReduxDispatch } from '../../store';
import { setInfoUser, setToken } from '../../store/slices/user/UserSlice';

import { FormUser } from '../../types/Form';
import Form from '../FormElemets';

function FormSession() {
	const initialState: FormUser = { email: 'ejemplo@gmail.com', name: 'user2', password: '123', passwordConfirm: '123' };

	const [inputsData, setInputsData] = useState<FormUser>(initialState);

	const dispach = useReduxDispatch();

	const { notifySuccess, notifyLoading } = useNotification();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputsData((prevState: FormUser) => {
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

			const res = await fetch(URL_API_BACKEND + '/user/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: inputsData.email, password: inputsData.password }),
			});

			const data = await res.json();
			notifySuccess('Login successfully');
			dispach(setToken(data.accessToken as string));
			dispach(setInfoUser(data.userInfo));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Form title='Log In' onSubmit={handleSubmit}>
			<div className='mb-6'>
				<Form.InputLabel
					label='Your email'
					type='email'
					name='email'
					placeholder='example@gmail.com'
					value={inputsData.email}
					onChange={handleChange}
				/>
			</div>
			<div className='mb-6'>
				<Form.InputLabel
					label='Your password'
					type='password'
					name='password'
					placeholder='******'
					value={inputsData.password}
					onChange={handleChange}
					autoComplete='off'
				/>
			</div>
			<div className='flex items-start mb-6'>
				<label className='text-sm font-medium text-gray-300 flex'>
					<input
						type='checkbox'
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
