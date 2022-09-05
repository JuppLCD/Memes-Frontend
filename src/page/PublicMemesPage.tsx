import useUsersMemes from '../hooks/useUsersMemes';

import Container from '../components/Container';
import GridMemes from '../components/GridMemes';

import Meme from '../components/Meme';

function PublicMemesPage() {
	const memes = useUsersMemes('/public');
	return (
		<main>
			<Container>
				<h2 className='text-center text-2xl mb-7'>Public Memes</h2>
				<div>
					{memes !== undefined && memes.length !== 0 ? (
						<GridMemes>
							{memes.map((meme) => (
								<Meme meme={meme} key={meme.uuid} />
							))}
						</GridMemes>
					) : (
						<p>No hay memes</p>
					)}
				</div>
			</Container>
		</main>
	);
}

export default PublicMemesPage;
