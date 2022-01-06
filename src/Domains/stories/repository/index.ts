/* eslint-disable no-unused-vars */
import { CreatedStory } from '../entities';

export interface StoryRepository {
  persist(createdStory: CreatedStory) : Promise<void>;
}
