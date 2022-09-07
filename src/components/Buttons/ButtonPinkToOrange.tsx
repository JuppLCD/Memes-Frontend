import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import ButtonGradient from './ButtonGradient';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

function ButtonPinkToOrange({ className, ...rest }: Props) {
	return (
		<ButtonGradient
			{...rest}
			className=' text-gray-900 from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200'
		/>
	);
}

export default ButtonPinkToOrange;
