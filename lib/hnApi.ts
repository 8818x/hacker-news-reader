import type { Story } from "@/types/story";

const BASE = "https://hacker-news.firebaseio.com/v0";

async function hnFetch<T>(path: string): Promise<T> {
	const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
	if (!res.ok) throw new Error(`HN API ${path}: ${res.status}`);
	return res.json() as Promise<T>;
}

export async function topStoryIds(): Promise<number[]> {
	return hnFetch<number[]>("/topstories.json");
}

export async function fetchItem<T = Record<string, unknown>>(id: number): Promise<T> {
	return hnFetch<T>(`/item/${id}.json`);
}

export async function fetchStories(ids: number[]): Promise<Story[]> {
	return Promise.all(ids.map((id) => fetchItem<Story>(id)));
}
