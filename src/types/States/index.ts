export interface UserState {
	isAuth: boolean;
	token: string | null;

	userInfo?: {
		name: string;
		id: string;
	};
}

export interface MemeState {
	renameMemeModal: {
		show: boolean;
		name: string;
		memeId: string;
	};
}
