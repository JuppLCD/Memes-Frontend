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
				texts: {
					color: string;
					fs: number;
					text: string;
					uuid: string;
					x: number;
					y: number;
				}[];
		  };
}
