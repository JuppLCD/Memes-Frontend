import { Navigate, useLocation } from 'react-router-dom';

import { useReduxSelector } from '../../store';

interface Props {
	children: JSX.Element;
}

function PrivateRoute({ children }: Props) {
	const { isAuth } = useReduxSelector((state) => state.user);
	const location = useLocation();

	const pathLogin = '/session/login';

	if (!isAuth) {
		return <Navigate to={pathLogin} state={{ from: location }} replace />;
	}
	return children;
}

export default PrivateRoute;
