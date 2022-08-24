export interface UserState {
	isAuth: boolean;
	token: string | null;

	userInfo?: {
		name: string;
		id: string;
	};
}
