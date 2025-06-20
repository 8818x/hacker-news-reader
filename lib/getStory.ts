import db from "./db";
import type { Story } from "../types/story";

export function storyExists(id: number): boolean {
	const stmt = db.prepare("SELECT 1 FROM stories WHERE id = ?");
	const result = stmt.get(id);
	return !!result;
}

export function getStory(id: number): Story | null {
    const storyRow = db.prepare("SELECT * FROM stories WHERE id = ?").get(id) as Story | undefined;

    if (!storyRow) return null;

    const kidsRows = db.prepare("SELECT kid_id FROM story_kids WHERE story_id = ?").all(id) as { kid_id: number }[];

    const kids = kidsRows.map((row) => row.kid_id);

    return {
        ...storyRow,
        kids: kids.length > 0 ? kids : undefined
    };
}
