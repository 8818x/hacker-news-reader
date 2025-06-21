import db from "./db";
import type { Story } from "@/types/story";
import { storyExists } from "./getStory";

const isSQLiteDisabled = process.env.VERCEL === "1";
const isProd = process.env.NODE_ENV === "production";

export function storeStory(story: Story) {
	if (isSQLiteDisabled || isProd) {
		console.log(`[storeStory] Skipped: SQLite is disabled in this environment.`);
		return;
	}

	if (!story || typeof story.id !== "number") return;

	if (storyExists(story.id)) return;

	const insertStory = db.prepare(`
  		INSERT INTO stories (id, title, by, url, time, descendants, score, type)
  		VALUES (@id, @title, @by, @url, @time, @descendants, @score, @type)
  		ON CONFLICT(id) DO UPDATE SET
    	title = excluded.title,
    	by = excluded.by,
    	url = excluded.url,
    	time = excluded.time,
    	descendants = excluded.descendants,
    	score = excluded.score,
    	type = excluded.type
	`);

	const safeStory = {
		id: story.id,
		title: story.title ?? '',
		by: story.by ?? '',
		url: story.url ?? '',
		time: story.time ?? 0,
		descendants: story.descendants ?? 0,
		score: story.score ?? 0,
		type: story.type ?? 'story'
	};

	insertStory.run(safeStory);

	const deleteKids = db.prepare(`DELETE FROM story_kids WHERE story_id = ?`);
	deleteKids.run(story.id);

	if (Array.isArray(story.kids)) {
		const insertKid = db.prepare(`
			INSERT INTO story_kids (story_id, kid_id) VALUES (?, ?)
		`);
		const insertMany = db.transaction((kids: number[]) => {
			for (const kidId of kids) {
				insertKid.run(story.id, kidId);
			}
		});
		insertMany(story.kids);
	}
}
