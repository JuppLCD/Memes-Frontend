import { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';

import { useLocalStorage } from './hooks/useStorage';

import { LOCAL_STORAGE_KEY_TOKEN, URL_API_BACKEND } from './config';

import { setInfoUser, setToken } from './store/slices/user/UserSlice';
import { useReduxDispatch } from './store';

import './index.css';

function App() {
	const [accessToken, _, removeAccessToken] = useLocalStorage(LOCAL_STORAGE_KEY_TOKEN, '');
	const dispach = useReduxDispatch();

	useEffect(() => {
		if (accessToken) {
			(async () => {
				const res = await fetch(URL_API_BACKEND + '/user/login', {
					method: 'POST',
					headers: {
						authorization: accessToken,
					},
				});
				// ! Mejorar validacion de la res
				if (res.status < 300 && res.status >= 200) {
					// {userInfo: { name: string, id: uuid }}
					const data = await res.json();
					dispach(setInfoUser(data.userInfo));
					dispach(setToken(accessToken));
				} else {
					removeAccessToken();
				}
			})();
		}
	}, []);

	return (
		<Router>
			<Layout />
		</Router>
	);
}

export default App;
