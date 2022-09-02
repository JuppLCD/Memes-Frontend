import { ChangeEvent, FormEvent } from 'react';

import { FormMeme } from '../../types/Form';

import { ButtonPinkToOrange, ButtonPurpleToBlue } from '../Buttons';
import Form from '../Form';
import PreviewTextMeme from './PreviewTextMeme';

interface Props {
	inputsData: FormMeme;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
	handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
	handleChangeTextMeme: (e: ChangeEvent<HTMLInputElement>) => void;
	addNewTextMeme: () => void;
	handleDownload: () => void;
	imgMemeRef: any;
}

function FormMemeView({
	inputsData,
	handleSubmit,
	handleChangeInput,
	handleChangeFile,
	handleChangeTextMeme,
	addNewTextMeme,
	imgMemeRef,
	handleDownload,
}: Props) {
	return (
		<Form onSubmit={handleSubmit} encType='multipart/form-data' title='Create Meme'>
			<div className='mb-6'>
				<Form.InputLabel label='Name:' type='text' name='name' value={inputsData.name} onChange={handleChangeInput} />
			</div>
			<div className='mb-6'>
				<Form.InputRadio
					title='Access:'
					name='access'
					handleChange={handleChangeInput}
					check={inputsData.access}
					inputs={[
						{ label: 'Public', value: 'true' },
						{ label: 'Private', value: 'false' },
					]}
				/>
			</div>
			<div>
				<label>
					<h4>Meme</h4>
					<input type='file' name='file' accept='image/png, image/jpg, image/jpeg' onChange={handleChangeFile} />
				</label>
			</div>
			<div>
				{inputsData.image_url && (
					<PreviewTextMeme
						inputsData={inputsData}
						handleChangeTextMeme={handleChangeTextMeme}
						addNewTextMeme={addNewTextMeme}
						imgMemeRef={imgMemeRef}
					/>
				)}
			</div>
			<div className='mt-3'>
				<ButtonPurpleToBlue disabled={inputsData.file === null || inputsData.image_url === undefined} type='submit'>
					Save
				</ButtonPurpleToBlue>

				<ButtonPinkToOrange
					type='button'
					disabled={inputsData.file === null || inputsData.image_url === undefined}
					onClick={handleDownload}
				>
					Download
				</ButtonPinkToOrange>
			</div>
		</Form>
	);
}

export default FormMemeView;
