import { Outlet } from 'react-router-dom';
import Container from '../components/Container';

const SessionPage = () => {
	return (
		<main>
			<Container>
				<Outlet />
			</Container>
		</main>
	);
};

export default SessionPage;
