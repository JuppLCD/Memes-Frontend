import { FormMeme } from '../../types/Form';
import Form from '../Form';

interface Props {
	inputsData: FormMeme;
	handleChangeTextMeme: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addNewTextMeme: () => void;
	deleteTextMeme: (uuid: string) => void;
	imgMemeRef: any;
}

function PreviewTextMeme({ inputsData, handleChangeTextMeme, addNewTextMeme, deleteTextMeme, imgMemeRef }: Props) {
	return (
		<>
			<div className='relative overflow-hidden mx-auto' style={{ maxWidth: 500 }}>
				<img
					src={inputsData.image_url}
					alt='create meme'
					ref={imgMemeRef}
					className='relative w-100'
					crossOrigin='anonymous'
					style={{ maxWidth: 500 }}
				/>
				{inputsData.texts?.map((textMeme) => (
					<div
						key={textMeme.uuid}
						className='absolute'
						style={{
							bottom: textMeme.y,
							left: textMeme.x,
							// transform: `translate(${textMeme.x}px, -${Math.floor(textMeme.fs / 0.6666) + textMeme.y}px)`,
							fontSize: textMeme.fs,
							textAlign: 'left',
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
					<li key={textMeme.uuid} className='m-5 '>
						<Form.InputLabel
							label={`Texto ${index + 1}:`}
							type='text'
							name={`textMeme__text__${textMeme.uuid}`}
							value={textMeme.text}
							onChange={handleChangeTextMeme}
						/>
						<Form.InputLabel
							label='X:'
							type='number'
							name={`textMeme__x__${textMeme.uuid}`}
							value={textMeme.x}
							onChange={handleChangeTextMeme}
						/>
						<Form.InputLabel
							label='Y:'
							type='number'
							name={`textMeme__y__${textMeme.uuid}`}
							value={textMeme.y}
							onChange={handleChangeTextMeme}
						/>
						<Form.InputLabel
							label='Font-size:'
							type='number'
							name={`textMeme__fs__${textMeme.uuid}`}
							value={textMeme.fs}
							onChange={handleChangeTextMeme}
						/>
						<div className='flex'>
							<Form.InputLabel
								label='Color:'
								type='color'
								name={`textMeme__color__${textMeme.uuid}`}
								value={textMeme.color}
								onChange={handleChangeTextMeme}
							/>
							<button
								type='button'
								className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0 ml-auto mt-2'
								onClick={() => deleteTextMeme(textMeme.uuid)}
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
