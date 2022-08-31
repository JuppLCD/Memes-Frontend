export interface FormUser {
	email: string;
	name: string;
	password: string;
	passwordConfirm: string;
	rememberMe: boolean;
}

export type TextMeme = { text: string; x: number; y: number; fs: number; id: string };

export interface FormMeme {
	name: string;
	access: 'false' | 'true';
	file: File | null;
	image_url: string | undefined;
	template: string | undefined;
	texts: TextMeme[] | undefined;
}
