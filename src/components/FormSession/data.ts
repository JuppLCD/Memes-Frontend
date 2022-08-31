import { FormUser } from '../../types/Form';

const initialState: FormUser = {
	email: 'ejemplo@gmail.com',
	name: 'user2',
	password: '123',
	passwordConfirm: '123',
	rememberMe: false,
};

function getInputsProps(inputsData: FormUser) {
	const inputsPropsRegister = [
		{
			label: 'Your Name',
			type: 'text',
			name: 'name',
			placeholder: 'UserName',
			value: inputsData.name,
		},
		{
			label: 'Your email',
			type: 'email',
			name: 'email',
			placeholder: 'example@gmail.com',
			value: inputsData.email,
		},
		{
			label: 'Your password',
			type: 'password',
			name: 'password',
			placeholder: '*******',
			value: inputsData.password,
			autoComplete: 'off',
		},
		{
			label: 'Confirm your password',
			type: 'password',
			name: 'passwordConfirm',
			placeholder: '*******',
			value: inputsData.passwordConfirm,
			autoComplete: 'off',
		},
	];
	const inputsPropsLogin = inputsPropsRegister.filter(
		(infoinput) => infoinput.name !== 'name' && infoinput.name !== 'passwordConfirm'
	);

	return { inputsPropsRegister, inputsPropsLogin };
}

export { initialState, getInputsProps };
