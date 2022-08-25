import { URL_API_BACKEND, URL_BACKEND } from '../../config';
import { useNotification } from '../../hooks/useNotification';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { userDeleteMeme } from '../../store/slices/meme/MemeSlice';
import { Meme as MemeType } from '../../types/Meme';

interface Props {
	meme: MemeType;
}
function Meme({ meme }: Props) {
	const userState = useReduxSelector((state) => state.user);
	const dispatch = useReduxDispatch();
	const { notifySuccess, notifyError, notifyLoading } = useNotification();

	const deleteMemeHandler = async () => {
		notifyLoading('Deleting');
		const res = await fetch(`${URL_API_BACKEND}/meme/delete/${meme.uuid}`, {
			method: 'DELETE',
			headers: { mode: 'no-cors', authorization: userState.token as string },
		});
		if (res.status === 200) {
			dispatch(userDeleteMeme(meme.uuid));
			notifySuccess(`${meme.name} - Deleting  successfully`);
		} else {
			notifyError(`Error deleting meme "${meme.name}"`);
		}
	};

	const isCreator = userState.userInfo?.id === meme.user_id;

	return (
		<div>
			<h2>Name: {meme.name}</h2>
			<p>{meme.access ? 'Public' : 'Private'}</p>
			<img src={`${URL_BACKEND}/storage/imgs/${meme.path_image}`} style={{ width: 300 }} />
			{isCreator && (
				<div>
					<button onClick={() => console.log('Click, edit Name in', meme.name)}>Edit Name</button>
					<button onClick={() => console.log('Click, edit Meme in', meme.name)}>Edit Meme</button>
					<button onClick={deleteMemeHandler}>Delete</button>
				</div>
			)}
		</div>
	);
}

export default Meme;
