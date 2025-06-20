import type { Metadata } from "next";
import type { Story } from "@/types/story";
import { JSX } from "react";

type PageParams = Promise<{ id: string }>;

async function fetchStoryData(id: string): Promise<Story | null> {
	try {
		const res = await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
			{ next: { revalidate: 60 } }
		);
		if (!res.ok) return null;
		return await res.json();
	} catch (err) {
		console.error(err);
		return null;
	}
}

export async function generateMetadata({
	params
}: {
	params: PageParams;
}): Promise<Metadata> {
	const { id } = await params;
	const story = await fetchStoryData(id);

	return {
		title: story?.title || "Story Not Found",
		description: `Story ID: ${id}`
	};
}

export default async function StoryPage({ params }: { params: PageParams }) {
	const { id } = await params;
	const story = await fetchStoryData(id);

	if (!story) {
		return (
			<div className="text-center py-10">
				<h1 className="text-2xl font-bold">Story Not Found</h1>
				<p className="text-sm text-gray-500 mt-2">
					The story with ID: {id} could not be loaded or does not exist.
				</p>
			</div>
		);
	}

	let commentElements: JSX.Element[] = [];

	if (Array.isArray(story.kids) && story.kids.length > 0) {
		const comments = await Promise.all(
			story.kids.slice(0, 5).map(async (commentId) => {
				try {
					const res = await fetch(
						`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
					);
					if (!res.ok) throw new Error(`Failed to fetch comment ${commentId}`);
					const comment = await res.json();
					if (!comment || !comment.text) return null;

					return (
						<li
							key={comment.id}
							className="p-4 bg-gray-50 border border-gray-200 rounded overflow-x-auto break-words prose max-w-full"
							dangerouslySetInnerHTML={{ __html: comment.text }}
						/>
					);
				} catch (err) {
					console.error(err);
					return null;
				}
			})
		);

		commentElements = comments.filter(Boolean) as JSX.Element[];
	}
	return (
		<div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-3xl font-bold mb-4">{story.title || "No Title"}</h1>

			<p className="text-gray-700 mb-2">
				<span className="font-semibold">Author:</span> {story.by || "Unknown"}
				<br />
				<span className="font-semibold">Score:</span> {story.score || 0}
			</p>

			{story.url && (
				<p className="mb-4">
					<a
						href={story.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 hover:underline"
					>
						Read original article
					</a>
				</p>
			)}

			<div className="mt-6">
				<h2 className="text-xl font-semibold mb-2">Top-level Comments</h2>

				{Array.isArray(story.kids) && story.kids.length > 0 ? (
					commentElements.length > 0 ? (
						<ul className="space-y-4">{commentElements}</ul>
					) : (
						<p className="text-gray-500">No comments available.</p>
					)
				) : (
					<p className="text-gray-500 italic">This story has no comments.</p>
				)}
			</div>
		</div>
	);
}
