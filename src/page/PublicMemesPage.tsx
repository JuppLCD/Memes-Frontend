import { useGetPublicMemesQuery } from '../services/MemesBackend';

import Container from '../components/Container';
import GridMemes from '../components/GridMemes';
import Meme from '../components/Meme';
import Spinner from '../components/Spinner';
import AlertError from '../components/Alerts/Error';

function PublicMemesPage() {
	const { data: memes, isLoading, isError } = useGetPublicMemesQuery(undefined);

	const hasMeme = memes !== undefined && memes.length !== 0;

	return (
		<main>
			<Container>
				<h2 className='text-center text-2xl mb-7'>Public Memes</h2>
				<div>
					{isLoading && <Spinner />}

					{memes !== undefined && memes.length !== 0 ? (
						<GridMemes>
							{memes.map((meme) => (
								<Meme meme={meme} key={meme.uuid} />
							))}
						</GridMemes>
					) : (
						<p>No hay memes</p>
					)}

					{isError && <AlertError title='Error fetching data' message='Could not get public memes from server' />}
				</div>
			</Container>
		</main>
	);
}

export default PublicMemesPage;
