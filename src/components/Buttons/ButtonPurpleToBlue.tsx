import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import ButtonGradient from './ButtonGradient';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

function ButtonPurpleToBlue({ className, ...rest }: Props) {
	return (
		<ButtonGradient
			{...rest}
			className=' text-gray-900 rounded-lg from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300'
		/>
	);
}

export default ButtonPurpleToBlue;
