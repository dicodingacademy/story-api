import { database } from '../../../sqlite';

const StoriesTableTestHelper = {
  async cleanTable(): Promise<void> {
    await database.prepare('DELETE FROM stories WHERE 1=1').run();
  },

  async findById(id: string): Promise<any> {
    return database.prepare('SELECT * FROM stories WHERE id = ?').get(id);
  },
};

export default StoriesTableTestHelper;
