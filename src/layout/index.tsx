import { Toaster } from 'react-hot-toast';
import ModalRenameMeme from '../components/Modal';

import Header from '../components/Header';
import Page from '../page';

function Layout() {
	return (
		<>
			<Header />
			<Page />
			<footer>
				<p>FOOTER</p>
			</footer>
			<ModalRenameMeme />;
			<Toaster
				position='top-center'
				reverseOrder={true}
				toastOptions={{
					loading: {
						duration: 1000,
					},
				}}
			/>
		</>
	);
}

export default Layout;
