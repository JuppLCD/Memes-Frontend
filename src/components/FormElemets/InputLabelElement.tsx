import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputLabelElementProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
}
function InputLabelElement({ label, ...input }: InputLabelElementProps) {
	const { className, ...rest } = input;

	return (
		<label className={`text-sm font-medium text-gray-300 mb-2`}>
			{label}
			<input
				{...rest}
				className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 ${className}`}
			/>
		</label>
	);
}

export default InputLabelElement;
