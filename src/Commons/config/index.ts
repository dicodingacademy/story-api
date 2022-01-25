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
    publicUrl: process.env.APP_PUBLIC_URL,
  },
  sqlite: {
    database: process.env.SQLITE_DATABASE,
  },
  tokenize: {
    secret: process.env.TOKENIZE_SECRET,
    age: process.env.TOKENIZE_AGE,
  },
  story: {
    deleteTimeInHours: process.env.STORY_DELETE_TIME_IN_HOURS,
    guestDeleteTimeInHours: process.env.STORY_GUEST_DELETE_TIME_IN_HOURS,
  },
};

export default config;
