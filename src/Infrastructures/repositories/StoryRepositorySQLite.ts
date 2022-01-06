import { Database } from 'better-sqlite3';
import { StoryRepository } from '../../Domains/stories/repository';
import { CreatedStory } from '../../Domains/stories/entities';
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
}

export default StoryRepositorySQLite;
