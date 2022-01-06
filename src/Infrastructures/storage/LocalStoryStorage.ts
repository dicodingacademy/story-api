/* istanbul ignore file */
import * as fs from 'fs';
import { StoryStorage } from '../../Domains/stories/storage';
import { StoryPhoto } from '../../Domains/stories/entities';
import config from '../../Commons/config';

class LocalStoryStorage implements StoryStorage {
  private readonly folder: string;

  constructor() {
    this.folder = '../../Interfaces/http/public/images/stories/';

    if (!fs.existsSync(this.folder)) {
      fs.mkdirSync(this.folder, { recursive: true });
    }
  }

  async saveStoryImage(storyPhoto: StoryPhoto): Promise<string> {
    const filename = `photos-${+new Date()}_${storyPhoto.meta.filename}`;
    const path = `${this.folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      storyPhoto.file.pipe(fileStream);
      fileStream.on('end', () => resolve(`${config.app.publicUrl}/images/stories/${filename}`));
    });
  }
}

export default LocalStoryStorage;
