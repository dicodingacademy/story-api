/* istanbul ignore file */
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.resolve(__dirname, '../../../.test.env') });
} else {
  dotenv.config();
}

const config = {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  sqlite: {
    database: process.env.SQLITE_DATABASE,
  },
  tokenize: {
    secret: process.env.TOKENIZE_SECRET,
  },
};

export default config;
