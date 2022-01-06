/* eslint-disable no-unused-vars */
import { StoryPhoto } from '../entities';

export interface StoryStorage {
  saveStoryImage(storyPhoto: StoryPhoto): Promise<string>;
}
