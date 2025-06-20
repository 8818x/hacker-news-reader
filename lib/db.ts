import Database from "better-sqlite3";

const db = new Database("stories.db");

db.exec(`
	CREATE TABLE IF NOT EXISTS stories (
		id INTEGER PRIMARY KEY,
		title TEXT,
		by TEXT,
		url TEXT,
		time INTEGER,
		descendants INTEGER,
		score INTEGER,
		type TEXT
	);
`);

db.exec(`
	CREATE TABLE IF NOT EXISTS story_kids (
		story_id INTEGER,
		kid_id INTEGER,
		PRIMARY KEY (story_id, kid_id),
		FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
	);
`);

export default db;