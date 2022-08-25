import Container from '../components/Container';
import GridMemes from '../components/GridMemes';

function PublicMemesPage() {
	return (
		<main>
			<Container>
				<h2>Public Memes</h2>
				<GridMemes to='/public' />
			</Container>
		</main>
	);
}

export default PublicMemesPage;
