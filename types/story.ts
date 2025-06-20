export interface Story {
	id: number;
	title: string;
	url?: string;
	by: string;
	time: number;
	descendants: number;
	score: number;
	kids?: number[];
	type: string;
}
