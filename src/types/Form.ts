export interface FormUser {
	email: string;
	name: string;
	password: string;
	passwordConfirm: string;
}

export interface FormMeme {
	name: string;
	access: 'false' | 'true';
	file: File | null;
}
