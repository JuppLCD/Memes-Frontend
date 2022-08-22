import { Link } from 'react-router-dom';
import Container from '../components/Container';
import FormMeme from '../components/FormMeme';

// Redux
import { useReduxSelector } from '../store';

function HomePage() {
	const userState = useReduxSelector((state) => state.user);

	return (
		<main>
			<Container>
				{userState.isAuth ? (
					<>
						<p>User connected</p>
						<FormMeme />
					</>
				) : (
					<>
						<p>No user</p>
					</>
				)}
			</Container>
		</main>
	);
}

export default HomePage;
