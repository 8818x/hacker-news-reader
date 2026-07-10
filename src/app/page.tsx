import Link from "next/link";
import { topStoryIds, fetchStories } from "@/lib/hnApi";

export default async function Home() {
	const ids = await topStoryIds();
	const stories = await fetchStories(ids.slice(0, 10));

	return (
		<div className="container max-w-2xl mx-auto px-4 py-6">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
				Top 10 Hacker News Stories
			</h1>
			<ul>
				{stories.map((story) => (
					<li key={story.id} className="border-b pb-4">
						<Link href={`/story/${story.id}`}>
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
