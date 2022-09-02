import { FormEvent, useRef } from 'react';

import { URL_API_BACKEND } from '../../config';

import { useReduxDispatch, useReduxSelector } from '../../store';
import { userCreteMeme } from '../../store/slices/meme/MemeSlice';

import { useFormMemeReducer } from './hooks/useReducer';
import { useNotification } from '../../hooks/useNotification';

import FormMemeView from './FormMemeView';

function FormMeme() {
	const {
		state: inputsData,
		handleChangeInput,
		handleChangeFile,
		handleChangeTextMeme,
		addNewTextMeme,
	} = useFormMemeReducer();

	const UserState = useReduxSelector((state) => state.user);
	const dispatch = useReduxDispatch();

	const { notifyError, notifyLoading, notifySuccess } = useNotification();

	const imgMemeRef = useRef();

	const canvasImgMeme = () => {
		if (inputsData.file === null || imgMemeRef.current === undefined) return;

		// IMG
		imgMemeRef.current as HTMLImageElement;
		const img = imgMemeRef.current;

		const { naturalWidth, naturalHeight } = img;

		const proporcion = naturalHeight / naturalWidth;

		const maxWidthMemeImg = 500;
		const maxHeightMemeImg = proporcion * maxWidthMemeImg;

		// CANVAS
		const canvas = document.createElement('canvas');

		canvas.width = maxWidthMemeImg;
		canvas.height = maxHeightMemeImg;

		const ctx = canvas.getContext('2d');

		if (ctx === null) {
			// ! Tirar error
			return;
		}

		ctx.drawImage(img, 0, 0, maxWidthMemeImg, maxHeightMemeImg);

		inputsData.texts?.forEach((text) => {
			ctx.font = `bold ${text.fs}px Arial`;
			ctx.fillStyle = 'white';
			ctx.fillText(text.text, text.x, maxHeightMemeImg - text.y);
		});

		return canvas;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const canvas = canvasImgMeme();

		if (!canvas) {
			// ! TIRRAR UN ERROR
			console.error('No se pudo crear el canvas al guardar la imagen');
			return;
		}

		canvas.toBlob(async (Blob) => {
			if (!Blob) {
				console.error('No se pudo crear el objeto Blob utilizando canvas');
				return;
			}

			if (inputsData.file !== null && inputsData.name && inputsData.access) {
				const formData = new FormData();
				formData.append('name', inputsData.name);
				// formData.append('file', inputsData.file as File);
				formData.append('file', Blob, inputsData.file?.name);
				formData.append('access', inputsData.access);

				notifyLoading();
				try {
					const res = await fetch(URL_API_BACKEND + '/meme/create', {
						method: 'POST',
						headers: {
							mode: 'no-cors',
							authorization: UserState.token as string,
						},
						body: formData,
					});
					// ! Se debe hacer validaciones de lo que entra
					const data = await res.json();
					dispatch(userCreteMeme(data));
					notifySuccess('Meme created successfully');
				} catch (err) {
					console.error(err);
					notifyError('Error to create meme');
				}
			} else {
				notifyError('All fields are required');
			}
		});
	};

	const handleDownload = () => {
		const canvas = canvasImgMeme();
		if (!canvas) return;

		const link = document.createElement('a');
		const nameImage = inputsData.name.trim() === '' ? 'meme' : inputsData.name.trim();
		link.download = nameImage + '.png';

		link.href = canvas.toDataURL();
		link.click();
	};

	return (
		<FormMemeView
			inputsData={inputsData}
			handleSubmit={handleSubmit}
			handleChangeInput={handleChangeInput}
			handleChangeFile={handleChangeFile}
			handleChangeTextMeme={handleChangeTextMeme}
			addNewTextMeme={addNewTextMeme}
			imgMemeRef={imgMemeRef}
			handleDownload={handleDownload}
		/>
	);
}

export default FormMeme;
