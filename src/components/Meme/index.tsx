import { Meme as MemeType } from '../../types/Meme';

import { URL_API_BACKEND, URL_BACKEND } from '../../config';

import { useNotification } from '../../hooks/useNotification';

import { useReduxDispatch, useReduxSelector } from '../../store';
import { userDeleteMeme } from '../../store/slices/meme/MemeSlice';

interface MemeProps {
	meme: MemeType;
}
function Meme({ meme }: MemeProps) {
	const userState = useReduxSelector((state) => state.user);

	const isCreator = userState.userInfo?.id === meme.user_id;

	return (
		<div>
			<h2>
				{meme.name} {!meme.access && <span className='inline-block text-orange-400 mr-auto'>| Private |</span>}
			</h2>
			<div className='h-full max-h-80'>
				<img
					src={`${URL_BACKEND}/storage/imgs/${meme.path_image}`}
					className='mx-auto h-full object-cover object-center w-full'
				/>
			</div>
			{isCreator && <OptionsMeme meme={meme} token={userState.token as string} />}
		</div>
	);
}

interface OptionsMemeProps {
	meme: MemeType;
	token: string;
}
function OptionsMeme({ meme, token }: OptionsMemeProps) {
	const { notifySuccess, notifyError, notifyLoading } = useNotification();
	const dispatch = useReduxDispatch();

	const deleteMemeHandler = async () => {
		notifyLoading('Deleting');
		const res = await fetch(`${URL_API_BACKEND}/meme/delete/${meme.uuid}`, {
			method: 'DELETE',
			headers: { mode: 'no-cors', authorization: token },
		});
		if (res.status === 200) {
			dispatch(userDeleteMeme(meme));
			notifySuccess(`${meme.name} - Deleting  successfully`);
		} else {
			notifyError(`Error deleting meme "${meme.name}"`);
		}
	};
	return (
		<div className='mt-1'>
			<button
				type='button'
				onClick={() => console.log('Click, edit Name in', meme.name)}
				className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
			>
				Rename
			</button>
			<button
				type='button'
				onClick={() => console.log('Click, edit Meme in', meme.name)}
				className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
			>
				Edit
			</button>
			<button
				type='button'
				onClick={deleteMemeHandler}
				className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
			>
				Delete
			</button>
		</div>
	);
}

export default Meme;
