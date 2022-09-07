import { Navigate, useLocation } from 'react-router-dom';

import { useReduxSelector } from '../../store';

interface LocationParams {
	state: {
		from: {
			pathname: string;
		} | null;
	};
}

interface Props {
	children: JSX.Element;
}

function GuestRoute({ children }: Props) {
	const { isAuth } = useReduxSelector((state) => state.user);
	const location = useLocation() as LocationParams;

	const routeDefaultUserLogged = '/user';

	if (isAuth) {
		const from = location.state?.from?.pathname || routeDefaultUserLogged;
		return <Navigate to={from} replace />;
	}
	return children;
}

export default GuestRoute;
