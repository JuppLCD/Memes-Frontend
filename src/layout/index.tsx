import { Toaster } from 'react-hot-toast';
import ModalRenameMeme from '../components/Modal';

import Header from '../components/Header';
import Page from '../page';
import Footer from '../components/Footer';

function Layout() {
	return (
		<>
			<Header />
			<Page />
			<Footer />
			<ModalRenameMeme />
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
