import { ChangeEvent, useReducer } from 'react';

import { FormMeme } from '../../../types/Form';
import { HANDLE_CHANGE_INPUT, ADD_NEW_TEXT_MEME, HANDLE_CHANGE_FILE, HANDLE_CHANGE_TEXT_MEME } from '../utils/actions';
import { ReducerActionClass } from '../utils/ReducerActionClass';

const initialState: FormMeme = {
	name: '',
	access: 'false',
	file: null,
	image_url: undefined,
	template: undefined,
	texts: undefined,
};

const reducer = (state: FormMeme, action: { type: string; payload: any }) => {
	switch (action.type) {
		case HANDLE_CHANGE_INPUT:
			return ReducerActionClass.handleChangeInput(state, action);

		case ADD_NEW_TEXT_MEME:
			return ReducerActionClass.addNewTextMeme(state, action);

		case HANDLE_CHANGE_FILE:
			return ReducerActionClass.handleChangeFile(state, action);
		case HANDLE_CHANGE_TEXT_MEME:
			return ReducerActionClass.handleChangeTextMeme(state, action);

		default:
			return state;
	}
};

function useFormMemeReducer() {
	const initialTextMeme = { text: 'Your text here', x: 0, y: 0, fs: 16, id: `uuid` };

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
		dispatch({ type: HANDLE_CHANGE_INPUT, payload: { target: e.target } });

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) =>
		dispatch({
			type: HANDLE_CHANGE_FILE,
			payload: { target: e.target, textMeme: { ...initialTextMeme, id: `${new Date().getTime()}_id` } },
		});
	const handleChangeTextMeme = (e: ChangeEvent<HTMLInputElement>) =>
		dispatch({ type: HANDLE_CHANGE_TEXT_MEME, payload: { target: e.target } });

	const addNewTextMeme = () => {
		dispatch({
			type: ADD_NEW_TEXT_MEME,
			payload: { ...initialTextMeme, id: `${new Date().getTime()}_id` },
		});
	};

	return { state, handleChangeInput, handleChangeFile, handleChangeTextMeme, addNewTextMeme };
}

export { useFormMemeReducer };
