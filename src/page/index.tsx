import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './RoutesType/PrivateRoute';
import GuestRoute from './RoutesType/GuestRoute';

import HomePage from './HomePage';
import UserPage from './UserPage';
import PublicMemesPage from './PublicMemesPage';
import SessionPage from './SessionPage';
import FormSession from '../components/FormSession';
import FormMemePage from './FormMemePage';

function Page() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />

			<Route
				path='/session'
				element={
					<GuestRoute>
						<SessionPage />
					</GuestRoute>
				}
			>
				<Route index element={<FormSession path='login' />} />
				<Route path='login' element={<FormSession path='login' />} />
				<Route path='register' element={<FormSession path='register' />} />
			</Route>

			{/* <Route path='/meme'>
				<Route
					path='create'
					element={
						<PrivateRoute>
							<FormMemePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='edit/:meme_id'
					element={
						<PrivateRoute>
							<FormMemePage />
						</PrivateRoute>
					}
				/>
			</Route> */}

			<Route
				path='/meme/create'
				element={
					<PrivateRoute>
						<FormMemePage />
					</PrivateRoute>
				}
			/>

			<Route
				path='/meme/edit/:meme_id'
				element={
					<PrivateRoute>
						<FormMemePage />
					</PrivateRoute>
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
