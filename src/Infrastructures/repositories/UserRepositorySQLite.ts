import { Database } from 'better-sqlite3';
import { UserRepository } from '../../Domains/users/repository';
import { database } from '../sqlite';
import { CreatedUser } from '../../Domains/users/entities';

class UserRepositorySQLite implements UserRepository {
  private database: Database;

  constructor() {
    this.database = database;
  }

  async isEmailAlreadyInUse(email: string): Promise<boolean> {
    const result = await this.database.prepare(
      'SELECT * FROM users WHERE email = ?',
    ).get(email);

    return !!result;
  }

  async persist(createdUser: CreatedUser): Promise<void> {
    const {
      id, email, name, hashedPassword,
    } = createdUser;

    await this.database.prepare(
      'INSERT INTO users (id, email, name, hashed_password) VALUES (?, ?, ?, ?)',
    ).run(id, email, name, hashedPassword);
  }
}

export default UserRepositorySQLite;
