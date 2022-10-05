import { Outlet } from 'react-router-dom';
import Container from '../components/Container';

const SessionPage = () => {
	return (
		<main>
			<Container>
				<p className='text-right'>Test-User =&gt; [ email : ejemplo@gmail.com , password: 123 ]</p>
				<Outlet />
			</Container>
		</main>
	);
};

export default SessionPage;
