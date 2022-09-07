import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import GridMemes from '../components/GridMemes';
import { API_MEMES_TEMPLATE_MEMES } from '../config';

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
						<Link
							to='/meme/create'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 inline-block focus:outline-none'
						>
							Create Meme
						</Link>
						<MemesApi />
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

function MemesApi() {
	const [memesTemplate, setMemesTemplate] = useState<MemeTemplateType[]>();
	useEffect(() => {
		(async () => {
			if (!memesTemplate) {
				const res = await fetch(API_MEMES_TEMPLATE_MEMES);
				const data = await res.json();

				if (data.success) {
					setMemesTemplate(data.data.memes);
				} else {
					console.error('Error Al buscar templates memes');
				}
			}
		})();
	}, []);

	const obj = {
		box_count: 2,
		height: 1200,
		id: '181913649',
		name: 'Drake Hotline Bling',
		url: 'https://i.imgflip.com/30b1gx.jpg',
		width: 1200,
	};

	return (
		<GridMemes>
			<>
				{memesTemplate !== undefined &&
					memesTemplate.map((template) => <MemeTemplate template={template} key={template.id} />)}
			</>
		</GridMemes>
	);
}

interface MemeTemplateType {
	box_count: number;
	height: number;
	id: string;
	name: string;
	url: string;
	width: number;
}

function MemeTemplate({ template }: { template: MemeTemplateType }) {
	const filename = template.url.split('/').reverse()[0].split('.');
	const name_img = filename[0];
	const format = filename[1];

	return (
		<div>
			<h5>{template.name}</h5>
			<img src={template.url} alt={template.name} />
			<Link
				to={`/meme/create?name_img=${name_img}&format=${format}`}
				className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 inline-block focus:outline-none'
			>
				Use Template
			</Link>
		</div>
	);
}
