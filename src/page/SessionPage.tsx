import { Link, Outlet } from 'react-router-dom';
import Container from '../components/Container';

const SessionPage = () => {
	return (
		<main>
			<Container>
				<div>
					<Link to='/session/login'>Login</Link>
					<Link to='/session/register'>Register</Link>
				</div>
				<Outlet />
			</Container>
		</main>
	);
};

export default SessionPage;
