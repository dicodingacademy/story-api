import { Database } from 'better-sqlite3';
import { UserRepository } from '@Domains/users/repository';
import { CreatedUser } from '@Domains/users/entities';
import { database } from '../sqlite';

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

  async findByEmail(email: string): Promise<CreatedUser | null> {
    const result = await this.database.prepare(
      'SELECT * FROM users WHERE email = ?',
    ).get(email);

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      email: result.email,
      name: result.name,
      hashedPassword: result.hashed_password,
    };
  }

  async findById(id: string): Promise<CreatedUser | null> {
    const result = await this.database.prepare(
      'SELECT * FROM users WHERE id = ?',
    ).get(id);

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      email: result.email,
      name: result.name,
      hashedPassword: result.hashed_password,
    };
  }
}

export default UserRepositorySQLite;
