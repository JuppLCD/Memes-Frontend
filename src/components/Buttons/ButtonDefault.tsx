import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'blue' | 'orange' | 'purple' | 'green' | 'yellow' | 'red' | 'gray';
}

function ButtonDefault({ className, children, variant = 'blue', ...rest }: Props) {
	return (
		<button
			{...rest}
			className={`text-white bg-${variant}-700 hover:bg-${variant}-800 focus:ring-4 focus:ring-${variant}-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none  ${className}`}
		>
			{children}
		</button>
	);
}

export default ButtonDefault;
