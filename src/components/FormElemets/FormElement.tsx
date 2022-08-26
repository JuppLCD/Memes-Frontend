import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

interface FormElementProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	title: string;
}
function FormElement({ title, ...rest }: FormElementProps) {
	return (
		<form {...rest}>
			{title && <h2 className='text-center text-2xl'>{title}</h2>}
			{rest.children}
		</form>
	);
}

export default FormElement;
