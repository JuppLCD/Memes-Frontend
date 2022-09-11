import { Meme } from '../Meme';

export interface UserState {
	isAuth: boolean;
	token: string | null;

	userInfo?: {
		name: string;
		id: string;
	};
}

export interface MemeState {
	userMemes?: Meme[];
	publicMemes?: {
		expireTime: number;
		memes: Meme[];
	};
}
