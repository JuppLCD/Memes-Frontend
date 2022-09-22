import { useDeleteMemeMutation } from '../../services/MemesBackend';
import { useNotification } from '../../hooks/useNotification';
import { useReduxDispatch, useReduxSelector } from '../../store';

import { openRenameMemeModal } from '../../store/slices/meme/MemeSlice';

import { URL_BACKEND } from '../../config';

import { Link } from 'react-router-dom';

import type { Meme as MemeType } from '../../types/Meme';

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
			{isCreator && <OptionsMeme meme={meme} />}
		</div>
	);
}

interface OptionsMemeProps {
	meme: MemeType;
}
function OptionsMeme({ meme }: OptionsMemeProps) {
	const { notifySuccess, notifyError, notifyLoading } = useNotification();
	const [deleteMeme, { isError }] = useDeleteMemeMutation();

	const dispatch = useReduxDispatch();
	const openModal = () => dispatch(openRenameMemeModal(meme));

	const deleteMemeHandler = async () => {
		notifyLoading('Deleting');
		await deleteMeme(meme.uuid).unwrap();

		if (isError) {
			notifyError(`Error deleting meme "${meme.name}"`);
		} else {
			notifySuccess(`${meme.name} - Deleting  successfully`);
		}
	};
	return (
		<div className='mt-1'>
			<button
				type='button'
				onClick={openModal}
				className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
			>
				Rename
			</button>

			{meme.template !== null && (
				<Link
					to={`/meme/edit/${meme.uuid}`}
					className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
				>
					Edit
				</Link>
			)}

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
