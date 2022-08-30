import { FormMeme } from '../../../types/Form';

export class ReducerActionClass {
	static handleChangeInput(state: FormMeme, action: { type: string; payload: any }): FormMeme {
		const { name, value } = action.payload.target;
		return {
			...state,
			[name]: value,
		};
	}
	static addNewTextMeme(state: FormMeme, action: { type: string; payload: any }): FormMeme {
		return {
			...state,
			texts: [...(state.texts ?? []), action.payload],
		};
	}
	static handleChangeFile(state: FormMeme, action: { type: string; payload: any }): FormMeme {
		const target = action.payload.target;

		if (target.name === 'file' && target.files) {
			const supportType = ['image/png', 'image/jpg', 'image/jpeg'];
			const file = target.files[0];

			if (!file) {
				return state;
			}

			if (supportType.includes(file.type)) {
				return {
					...state,
					file,
					image_url: URL.createObjectURL(file),
					texts: [action.payload.textMeme],
				};
			} else {
				// notifyError('Invalid file type, valid types are: png, jpg, jpeg');
				return state;
			}
		}
		return state;
	}

	static handleChangeTextMeme(state: FormMeme, action: { type: string; payload: any }): FormMeme {
		const { name, value } = action.payload.target;

		if (name.includes('textMeme') && state.texts) {
			type keysTextMeme = 'text' | 'x' | 'y' | 'fs';
			const id_textMeme = name.split('-')[2];
			const type_textMeme: keysTextMeme = name.split('-')[1] as keysTextMeme;

			const index_textMeme = state.texts?.findIndex((textMeme) => textMeme.id === id_textMeme);

			if (index_textMeme < 0) {
				return state;
			}
			const updateTextMeme = { ...state.texts[index_textMeme] };
			const newStateTexts = [...state.texts];

			if (type_textMeme === 'text') {
				updateTextMeme[type_textMeme] = value;
			} else if (type_textMeme === 'fs') {
				const minValueOfFontSize = 10;
				updateTextMeme[type_textMeme] = Number(value) < minValueOfFontSize ? minValueOfFontSize : Number(value);
			} else {
				updateTextMeme[type_textMeme] = Number(value) < 0 ? 0 : Number(value);
			}
			newStateTexts[index_textMeme] = updateTextMeme;

			return { ...state, texts: [...newStateTexts] };
		}
		return state;
	}
}
