import { FormMeme } from '../../types/Form';
import Form from '../Form';

interface Props {
	inputsData: FormMeme;
	handleChangeTextMeme: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addNewTextMeme: () => void;
	imgMemeRef: any;
}

function PreviewTextMeme({ inputsData, handleChangeTextMeme, addNewTextMeme, imgMemeRef }: Props) {
	return (
		<>
			<div className='relative overflow-hidden'>
				<img
					src={inputsData.image_url}
					alt='create meme'
					ref={imgMemeRef}
					className='relative w-100'
					style={{ maxWidth: 500 }}
				/>
				{inputsData.texts?.map((textMeme) => (
					<div
						key={textMeme.id}
						className='absolute'
						style={{
							bottom: textMeme.y,
							left: textMeme.x,
							fontSize: textMeme.fs,
							textAlign: 'center',
							fontWeight: 'bold',
						}}
					>
						{textMeme.text}
					</div>
				))}
			</div>
			<button onClick={addNewTextMeme}>Add text</button>
			<ul>
				{inputsData.texts?.map((textMeme, index) => (
					<li key={textMeme.id} className='my-5'>
						{index > 0 && <hr className='my-5' />}
						<Form.InputLabel
							label={`Texto ${index + 1}:`}
							type='text'
							name={`textMeme-text-${textMeme.id}`}
							value={textMeme.text}
							onChange={handleChangeTextMeme}
						/>
						<Form.InputLabel
							label='X:'
							type='number'
							name={`textMeme-x-${textMeme.id}`}
							value={textMeme.x}
							onChange={handleChangeTextMeme}
						/>
						<Form.InputLabel
							label='Y:'
							type='number'
							name={`textMeme-y-${textMeme.id}`}
							value={textMeme.y}
							onChange={handleChangeTextMeme}
						/>
						<Form.InputLabel
							label='Font-size:'
							type='number'
							name={`textMeme-fs-${textMeme.id}`}
							value={textMeme.fs}
							onChange={handleChangeTextMeme}
						/>
					</li>
				))}
			</ul>
		</>
	);
}

export default PreviewTextMeme;
