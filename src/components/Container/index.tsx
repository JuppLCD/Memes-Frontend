interface Props {
	children: JSX.Element | JSX.Element[];
}
function Container({ children }: Props) {
	return <div className='lg:container p-5  mx-auto'>{children}</div>;
}

export default Container;
