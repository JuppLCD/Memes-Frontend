import { useGetUserMemesQuery } from '../services/MemesBackend';

import Container from '../components/Container';
import GridMemes from '../components/GridMemes';
import Meme from '../components/Meme';
import AlertError from '../components/Alerts/Error';
import Spinner from '../components/Spinner';

function UserPage() {
	const { data: memes, isLoading, isError } = useGetUserMemesQuery(undefined);

	return (
		<main>
			<Container>
				<h2 className='text-center text-2xl mb-7'>User Memes</h2>
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

export default UserPage;
