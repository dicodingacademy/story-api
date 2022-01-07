import { Database } from 'better-sqlite3';
import { StoryRepository } from '../../Domains/stories/repository';
import { CreatedStory, Story } from '../../Domains/stories/entities';
import { database } from '../sqlite';

class StoryRepositorySQLite implements StoryRepository {
  private db: Database;

  constructor() {
    this.db = database;
  }

  async persist({
    id, userId, description, photoUrl, createdAt, lat, lon,
  }: CreatedStory): Promise<void> {
    const statement = this.db.prepare(
      `INSERT INTO stories (id, user_id, description, photo_url, created_at, lat, lon)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    );

    statement.run(id, userId, description, photoUrl, createdAt, lat, lon);
  }

  async getAllStories(): Promise<Story[]> {
    const statement = this.db.prepare(`
        SELECT stories.id, users.name, stories.description, stories.created_at, stories.photo_url, stories.lat, stories.lon 
        FROM stories
        LEFT JOIN users ON stories.user_id = users.id`);

    const rows = statement.all();

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      photoUrl: row.photo_url,
      createdAt: row.created_at,
      lat: row.lat,
      lon: row.lon,
    }));
  }
}

export default StoryRepositorySQLite;
