import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

// Gradient duotone  | Gradient outline | Purple to blue
// ! Buscar un nombre mas corto .... :O
function ButtonGradientPurpleToBlue({ children, className, ...rest }: Props) {
	return (
		<button
			className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 '
			{...rest}
		>
			<span className='relative px-5 py-2 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0'>
				{children}
			</span>
		</button>
	);
}

export default ButtonGradientPurpleToBlue;
