/* istanbul ignore file */
import { database } from '../../../sqlite';

const StoriesTableTestHelper = {
  async cleanTable(): Promise<void> {
    await database.prepare('DELETE FROM stories WHERE 1=1').run();
  },

  async findById(id: string): Promise<any> {
    return database.prepare('SELECT * FROM stories WHERE id = ?').get(id);
  },

  async findAll(): Promise<any> {
    return database.prepare('SELECT * FROM stories').all();
  },

  async addStory({
    id = 'story-123',
    userId = 'user-123',
    description = 'Lorem ipsum',
    createdAt = new Date().toISOString(),
    photoUrl = 'https://example.com/photo.jpg',
    lat = -23.5,
    lon = -46.6,
  }: any = {}): Promise<void> {
    await database.prepare(
      `INSERT INTO stories (id, user_id, description, created_at, photo_url, lat, lon)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(id, userId, description, createdAt, photoUrl, lat, lon);
  },
};

export default StoriesTableTestHelper;
