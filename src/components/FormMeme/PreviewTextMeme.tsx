import { FormMeme } from '../../types/Form';
import Form from '../Form';

interface Props {
	inputsData: FormMeme;
	handleChangeTextMeme: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addNewTextMeme: () => void;
	deleteTextMeme: (id: string) => void;
	imgMemeRef: any;
}

function PreviewTextMeme({ inputsData, handleChangeTextMeme, addNewTextMeme, deleteTextMeme, imgMemeRef }: Props) {
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
							color: textMeme.color,
						}}
					>
						{textMeme.text}
					</div>
				))}
			</div>
			<button type='button' onClick={addNewTextMeme}>
				Add text
			</button>
			<ul className='flex flex-wrap'>
				{inputsData.texts?.map((textMeme, index) => (
					<li key={textMeme.id} className='m-5 '>
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
						<div className='flex'>
							<Form.InputLabel
								label='Color:'
								type='color'
								name={`textMeme-color-${textMeme.id}`}
								value={textMeme.color}
								onChange={handleChangeTextMeme}
							/>
							<button
								type='button'
								className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0 ml-auto mt-2'
								onClick={() => deleteTextMeme(textMeme.id)}
							>
								Delete text
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default PreviewTextMeme;
