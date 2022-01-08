/* istanbul ignore file */

import { database } from '@Infrastructures/sqlite';

const UsersTableTestHelper = {
  async cleanTable() {
    await database.prepare('DELETE FROM users WHERE 1 = 1').run();
  },

  async findUserByEmail(email: string) {
    return database.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  async addUser({
    id = 'user-123', name = 'dimas', email = 'dimas@dicoding.com', hashedPassword = 'hashed_password',
  } : any) {
    await database.prepare('INSERT INTO users (id, name, email, hashed_password) VALUES (?, ?, ?, ?)')
      .run(id, name, email, hashedPassword);
  },
};

export default UsersTableTestHelper;
