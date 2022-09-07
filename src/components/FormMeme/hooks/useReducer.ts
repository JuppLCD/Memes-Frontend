import { ChangeEvent, useEffect, useReducer } from 'react';

import { FormMeme } from '../../../types/Form';
import {
	HANDLE_CHANGE_INPUT,
	ADD_NEW_TEXT_MEME,
	HANDLE_CHANGE_FILE,
	HANDLE_CHANGE_TEXT_MEME,
	DELETE_TEXT_MEME,
	UPDATE_DEFAULT_STATE,
} from '../utils/actions';
import { ReducerActionClass } from '../utils/ReducerActionClass';

const reducer = (state: FormMeme, action: { type: string; payload: any }) => {
	switch (action.type) {
		case HANDLE_CHANGE_INPUT:
			return ReducerActionClass.handleChangeInput(state, action);

		case ADD_NEW_TEXT_MEME:
			return ReducerActionClass.addNewTextMeme(state, action);

		case DELETE_TEXT_MEME:
			return ReducerActionClass.deleteTextMeme(state, action);

		case HANDLE_CHANGE_FILE:
			return ReducerActionClass.handleChangeFile(state, action);

		case HANDLE_CHANGE_TEXT_MEME:
			return ReducerActionClass.handleChangeTextMeme(state, action);

		case UPDATE_DEFAULT_STATE:
			return action.payload as FormMeme;

		default:
			return state;
	}
};

function useFormMemeReducer(defaultState: FormMeme) {
	const initialTextMeme = { text: 'Your text here', x: 0, y: 0, fs: 16, id: `uuid`, color: '#000000' };

	const [state, dispatch] = useReducer(reducer, defaultState);

	useEffect(() => {
		dispatch({ type: UPDATE_DEFAULT_STATE, payload: defaultState });
	}, [defaultState]);

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

	const deleteTextMeme = (id: string) => {
		dispatch({
			type: DELETE_TEXT_MEME,
			payload: { id },
		});
	};

	return { state, handleChangeInput, handleChangeFile, handleChangeTextMeme, addNewTextMeme, deleteTextMeme };
}

export { useFormMemeReducer };
