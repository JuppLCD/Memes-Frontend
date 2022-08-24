import { ChangeEvent, FormEvent, useState } from 'react';
import { URL_API_BACKEND } from '../../config';

// REDUX
import { useReduxDispatch } from '../../store';
import { setInfoUser, setToken } from '../../store/slices/user/UserSlice';

import { FormUser } from '../../types/Form';

function FormSession() {
	const initialState: FormUser = { email: 'ejemplo@gmail.com', name: 'user2', password: '123', passwordConfirm: '123' };

	const [inputsData, setInputsData] = useState<FormUser>(initialState);

	const dispach = useReduxDispatch();

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

		const res = await fetch(URL_API_BACKEND + '/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: inputsData.email, password: inputsData.password }),
		});

		const data = await res.json();
		dispach(setToken(data.accessToken as string));
		dispach(setInfoUser(data.userInfo));
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<h2>FORM USER</h2>
			<div>
				<label>
					Email
					<input
						type='email'
						name='email'
						value={inputsData.email}
						onChange={handleChange}
						placeholder='example@gmail.com'
					/>
				</label>
			</div>
			<div>
				<label>
					Password
					<input
						type='password'
						name='password'
						value={inputsData.password}
						onChange={handleChange}
						placeholder='*******'
						autoComplete='off'
					/>
				</label>
			</div>
			<button type='submit'>Submit</button>
		</form>
	);
}

export default FormSession;
