type Texts = {
	color: string;
	fs: number;
	text: string;
	uuid: string;
	x: number;
	y: number;
};
export interface Meme {
	access: boolean;
	name: string;
	path_image: string;
	user_id: string;
	uuid: string;
	template:
		| string
		| null
		| {
				url: string;
				texts: Texts[];
		  };
	texts?: Texts[];
}
