export interface MemeTemplateType {
	box_count: number;
	height: number;
	id: string;
	name: string;
	url: string;
	width: number;
}

export interface APIResMemeTemplate {
	succes: boolean;
	data: { memes: MemeTemplateType[] } | null;
}
