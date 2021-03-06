import DB, { Database } from 'better-sqlite3';
import config from '@Commons/config';

const migrateTable = (database: Database) => {
  const query = `
  CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      hashed_password TEXT NOT NULL);
  
  CREATE TABLE IF NOT EXISTS stories (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      lat REAL,
      lon REAL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);

  INSERT INTO users (id, name, email, hashed_password)
  SELECT * FROM (SELECT 'user-guest', 'Guest', 'guest@dicoding.com', '$2b$10$2pf') AS tmp
  WHERE NOT EXISTS (SELECT id FROM users WHERE id = 'user-guest')
  LIMIT 1;
  `;

  database.exec(query);
};

const createDatabase = () => {
  const database = new DB(config.sqlite.database);
  migrateTable(database);
  return database;
};

export const database = createDatabase();
