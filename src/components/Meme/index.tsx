import { URL_BACKEND } from '../../config';
import { useReduxSelector } from '../../store';
import { Meme as MemeType } from '../../types/Meme';

interface Props {
	meme: MemeType;
}
function Meme({ meme }: Props) {
	const userState = useReduxSelector((state) => state.user);

	const isCreator = userState.userInfo?.id === meme.user_id;
	return (
		<div>
			<h2>Name: {meme.name}</h2>
			<p>{meme.access ? 'Public' : 'Private'}</p>
			<img src={`${URL_BACKEND}/storage/imgs/${meme.path_image}`} style={{ width: 300 }} />
			{isCreator && (
				<div>
					<button onClick={() => console.log('Click, edit in', meme.name)}>Edit</button>
					<button onClick={() => console.log('Click, delete in', meme.name)}>Delete</button>
				</div>
			)}
		</div>
	);
}

export default Meme;
