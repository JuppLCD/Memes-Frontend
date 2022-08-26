import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface FormProps extends DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
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

interface InputProps {
	label: { text: string; className: string };
	replaceClass?: boolean;
	input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
function Input({ label, input: { className, ...input }, replaceClass = false }: InputProps) {
	return (
		<label className={`text-sm font-medium text-gray-300 ${label.className}`}>
			{label.text}
			<input
				{...input}
				className={`${
					replaceClass
						? ''
						: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2'
				} ${className}`}
			/>
		</label>
	);
}

export { Form, Input };
