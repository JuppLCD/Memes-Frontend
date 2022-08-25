import Container from '../components/Container';
import GridMemes from '../components/GridMemes';

function UserPage() {
	return (
		<main>
			<Container>
				<h2>User Memes</h2>
				<GridMemes to='/' />
			</Container>
		</main>
	);
}

export default UserPage;
