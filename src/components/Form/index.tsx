import InputLabelElement from './InputLabelElement';
import InputRadioElement from './InputRadioElement';

import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	title: string;
}
function Form({ title, ...rest }: FormProps) {
	return (
		<form {...rest}>
			{title && <h2 className='text-center text-2xl'>{title}</h2>}
			{rest.children}
		</form>
	);
}

export default Object.assign(Form, { InputLabel: InputLabelElement, InputRadio: InputRadioElement });
