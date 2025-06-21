import Link from "next/link";
import type { Story } from "@/types/story";
import { storeStory } from "@/lib/storeStory";

export default async function Home() {
	const resIds = await fetch(
		"https://hacker-news.firebaseio.com/v0/topstories.json",
		{
			cache: "no-store"
		}
	);

	if (!resIds.ok) {
		throw new Error(`Failed to fetch story ids: ${resIds.status}`);
	}

	const ids = (await resIds.json()) as number[];
	const topTen = ids.slice(0, 10);

	const storyData = await Promise.all(
		topTen.map(async (id) => {
			const res = await fetch(
				`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
				{
					cache: "no-store"
				}
			);
			if (!res.ok) {
				throw new Error(`Failed to fetch story ${id}: ${res.status}`);
			}

			const story = (await res.json()) as Story;

			storeStory(story);

			return story;
		})
	);

	return (
		<div className="container max-w-2xl mx-auto px-4 py-6">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
				Top 10 Hacker News Stories
			</h1>
			<ul>
				{storyData.map((story) => (
					<li key={story.id} className="border-b pb-4">
						<Link href={`/story/${story.id}`} rel="noopener noreferrer">
							<h2 className="text-lg font-semibold hover:underline">
								{story.title}
							</h2>
						</Link>
						<div className="text-sm text-gray-600 mt-1">
							<span>by {story.by}</span>
							<span className="mx-2">|</span>
							<span>{story.score} points</span>
							<span className="mx-2">|</span>
							<span>{story.descendants} comments</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
