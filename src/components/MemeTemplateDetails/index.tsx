import { Link } from 'react-router-dom';

import type { MemeTemplateType } from '../../types/services';

function MemeTemplateDetails({ template }: { template: MemeTemplateType }) {
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

export default MemeTemplateDetails;
