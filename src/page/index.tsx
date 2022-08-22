import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './RoutesType/PrivateRoute';
import GuestRoute from './RoutesType/GuestRoute';

import HomePage from './HomePage';
import UserPage from './UserPage';
import PublicMemesPage from './PublicMemesPage';
import SessionPage from './SessionPage';

function Page() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />

			<Route
				path='/login'
				element={
					<GuestRoute>
						<SessionPage />
					</GuestRoute>
				}
			/>

			<Route
				path='/public'
				element={
					<PrivateRoute>
						<PublicMemesPage />
					</PrivateRoute>
				}
			/>

			<Route
				path='/user'
				element={
					<PrivateRoute>
						<UserPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
}

export default Page;
