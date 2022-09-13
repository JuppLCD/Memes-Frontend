export interface FormUser {
	email: string;
	name: string;
	password: string;
	passwordConfirm: string;
	rememberMe: boolean;
}

export type TextMeme = { text: string; x: number; y: number; fs: number; uuid: string; color: string };

export interface FormMeme {
	name: string;
	access: 'false' | 'true';
	file: File | null;
	image_url: string | undefined;
	texts: TextMeme[] | undefined;
}
