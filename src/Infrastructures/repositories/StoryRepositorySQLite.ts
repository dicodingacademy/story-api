import { Database } from 'better-sqlite3';
import { StoryRepository } from '@Domains/stories/repository';
import { CreatedStory, Story } from '@Domains/stories/entities';
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

  async deleteStory(id: string): Promise<void> {
    const statement = this.db.prepare('DELETE FROM stories WHERE id = ?');
    statement.run(id);
  }

  async deleteAllStoriesExpectFromAdminAndReviewer(): Promise<void> {
    const statement = this.db.prepare(`DELETE FROM stories WHERE user_id != (
        SELECT id FROM users WHERE email = 'admin@dicoding.com' OR email = 'reviewer@reviewer.com'
    )`);
    statement.run();
  }

  async getAllStoriesExpectFromAdminAndReviewer(): Promise<Story[]> {
    const statement = this.db.prepare(`
        SELECT stories.id, users.name, stories.description, stories.created_at, stories.photo_url, stories.lat, stories.lon 
        FROM stories
        LEFT JOIN users ON stories.user_id = users.id
        WHERE stories.user_id != (
            SELECT id FROM users WHERE email = 'admin@dicoding.com' OR email = 'reviewer@reviewer.com'
        )`);

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

  async isStoryOwnedByDicodingAdmin(id: string): Promise<boolean> {
    const statement = this.db.prepare(`
        SELECT stories.id, users.email
        FROM stories
        LEFT JOIN users ON stories.user_id = users.id
        WHERE stories.id = ?
        AND users.email = 'admin@dicoding.com'
    `);

    const row = statement.get(id);
    return !!row;
  }

  async getStoriesWithPaging(
    page: number = 1, size: number = 10, isLocation: boolean = false,
  ): Promise<Story[]> {
    let statement;

    if (isLocation) {
      statement = this.db.prepare(`
        SELECT stories.id, users.name, stories.description, stories.created_at, stories.photo_url, stories.lat, stories.lon 
        FROM stories
        LEFT JOIN users ON stories.user_id = users.id
        WHERE stories.lat IS NOT NULL
        AND stories.lon IS NOT NULL
        ORDER BY stories.created_at DESC
        LIMIT ? OFFSET ?`);
    } else {
      statement = this.db.prepare(`
        SELECT stories.id, users.name, stories.description, stories.created_at, stories.photo_url, stories.lat, stories.lon 
        FROM stories
        LEFT JOIN users ON stories.user_id = users.id
        ORDER BY stories.created_at DESC
        LIMIT ? OFFSET ?`);
    }

    const rows = statement.all(size, (page - 1) * size);

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
