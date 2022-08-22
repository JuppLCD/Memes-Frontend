import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';

import { store } from './store';
import { Provider } from 'react-redux';

import './index.css';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Layout />
			</Router>
		</Provider>
	);
}

export default App;
