import { useGetMemesTemplateQuery } from '../services/MemesTemplate';
import { useReduxSelector } from '../store';

import { Link } from 'react-router-dom';
import AlertError from '../components/Alerts/Error';
import Container from '../components/Container';
import GridMemes from '../components/GridMemes';
import MemeTemplateDetails from '../components/MemeTemplateDetails';
import Spinner from '../components/Spinner';

function HomePage() {
	const userState = useReduxSelector((state) => state.user);

	return (
		<main>
			<Container>
				{userState.isAuth ? (
					<>
						<p>User connected</p>
						<Link
							to='/meme/create'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 inline-block focus:outline-none'
						>
							Create Meme
						</Link>
						<GridMemesTemplate />
					</>
				) : (
					<>
						<h3>User not logged in</h3>
						<p>test user -&gt; email : ejemplo@gmail.com , password: 123</p>
					</>
				)}
			</Container>
		</main>
	);
}

export default HomePage;

function GridMemesTemplate() {
	const { data: memesTemplate, isLoading, isError } = useGetMemesTemplateQuery(undefined);

	if (isLoading) return <Spinner />;

	if (isError || !memesTemplate || !memesTemplate.data)
		return (
			<AlertError
				title='Failed to search for information'
				message='The data of the meme templates could not be retrieved'
			/>
		);

	return (
		<GridMemes>
			<>
				{memesTemplate.data.memes.map((template) => (
					<MemeTemplateDetails template={template} key={template.id} />
				))}
			</>
		</GridMemes>
	);
}
