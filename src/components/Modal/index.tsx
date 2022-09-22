import { useEffect, useState } from 'react';
import { useEditNameMemeMutation } from '../../services/MemesBackend';
import { useReduxDispatch, useReduxSelector } from '../../store';

import { closeRenameMemeModal } from '../../store/slices/meme/MemeSlice';

import type { FormEvent } from 'react';

import Form from '../Form';
import { Button } from '../Buttons';
import { useNotification } from '../../hooks/useNotification';

function ModalRenameMeme() {
	const { show, name, memeId } = useReduxSelector((state) => state.memes.renameMemeModal);
	const dispatch = useReduxDispatch();
	const closeModal = () => dispatch(closeRenameMemeModal());

	const [inputName, setInputName] = useState(name);
	const { notifyError, notifySuccess } = useNotification();

	const [editName, { isError, isLoading }] = useEditNameMemeMutation();

	useEffect(() => {
		if (inputName !== name) setInputName(name);
	}, [name]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputName.trim() === '') {
			return alert('No se puede tener un meme sin nombre');
		}
		try {
			const updateMeme = await editName({ memeId, name: inputName }).unwrap();

			if (isError) {
				throw new Error('Error to rename meme');
			}

			notifySuccess(`Renamed successfully, from ${name} to ${updateMeme.name}`);
		} catch (err) {
			notifyError('Error to rename meme');
		}
	};

	return (
		<>
			<div
				tabIndex={-1}
				aria-hidden={show}
				onClick={closeModal}
				className={`${
					show ? '' : 'hidden'
				} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full flex justify-center items-center`}
			>
				<div className='relative p-4 w-full max-w-md h-full md:h-auto m-auto'>
					{/* Modal content */}
					<div className='relative bg-indigo-600 rounded-lg shadow' onClick={(e) => e.stopPropagation()}>
						<Button variant='red' className='py-3 px-4' type='button' onClick={closeModal}>
							<svg
								aria-hidden={show}
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='sr-only'>Close modal</span>
						</Button>
						<div className='py-6 px-6 lg:px-8'>
							<Form className='space-y-6 text-withe' title='Rename Meme' onSubmit={handleSubmit}>
								<Form.InputLabel
									label='New Name'
									type='text'
									name='name'
									value={inputName}
									onChange={(e) => setInputName(e.target.value)}
									required
								/>

								<Button type='submit'>{isLoading ? 'Loading...' : 'Rename'}</Button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ModalRenameMeme;
