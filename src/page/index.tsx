import { Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';

function Page() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
		</Routes>
	);
}

export default Page;
