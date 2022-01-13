/* eslint-disable no-unused-vars */

import { CreatedStory, Story } from '@Domains/stories/entities';

export interface StoryRepository {
  persist(createdStory: CreatedStory) : Promise<void>;
  getAllStories() : Promise<Story[]>;
  deleteStory(id: string) : Promise<void>;
  deleteAllStoriesExpectFromDicoding() : Promise<void>;
  getAllStoriesExpectFromDicoding() : Promise<Story[]>;
  isStoryOwnedByDicodingAdmin(id: string) : Promise<boolean>;
  getStoriesWithPaging(page?: number, size?: number) : Promise<Story[]>;
}
