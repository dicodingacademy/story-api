/* eslint-disable no-unused-vars */

import { StoryPhoto } from '@Domains/stories/entities';

export interface StoryStorage {
  saveStoryImage(storyPhoto: StoryPhoto): Promise<string>;
  deleteSavedStoryImage(imageName: string): Promise<void>;
}
