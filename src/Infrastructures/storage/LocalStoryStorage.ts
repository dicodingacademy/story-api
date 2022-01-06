/* istanbul ignore file */
import * as fs from 'fs';
import { resolve } from 'path';
import { StoryStorage } from '../../Domains/stories/storage';
import { StoryPhoto } from '../../Domains/stories/entities';
import config from '../../Commons/config';

class LocalStoryStorage implements StoryStorage {
  private readonly folder: string;

  constructor() {
    this.folder = resolve(__dirname, '../../Interfaces/http/public/images/stories/');

    if (!fs.existsSync(this.folder)) {
      console.log(`Creating folder: ${this.folder}`);
      fs.mkdirSync(this.folder, { recursive: true });
    }
  }

  async saveStoryImage(storyPhoto: StoryPhoto): Promise<string> {
    const filename = `photos-${+new Date()}_${storyPhoto.meta.filename}`;
    const path = `${this.folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((res, rej) => {
      fileStream.on('error', (error) => rej(error));
      storyPhoto.file.pipe(fileStream);
      fileStream.on('finish', () => res(`${config.app.publicUrl}/images/stories/${filename}`));
    });
  }
}

export default LocalStoryStorage;
