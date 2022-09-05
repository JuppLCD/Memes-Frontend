interface Props {
	children: JSX.Element | JSX.Element[];
}
function GridMemes({ children }: Props) {
	return <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:mx-auto sm:max-w-full'>{children}</div>;
}

export default GridMemes;
