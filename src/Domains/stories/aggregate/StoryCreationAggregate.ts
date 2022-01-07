import { CreatedStory, StoryCreation } from '../entities';
import { StoryStorage } from '../storage';
import { IdGenerator } from '../../commons/utils';

class StoryCreationAggregate {
  private storyStorage: StoryStorage;

  private idGenerator: IdGenerator;

  constructor(
    storyStorage: StoryStorage,
    idGenerator: IdGenerator,
  ) {
    this.storyStorage = storyStorage;
    this.idGenerator = idGenerator;
  }

  async createStory(storyCreation: StoryCreation): Promise<CreatedStory> {
    const photoUrl = await this.storyStorage.saveStoryImage(storyCreation.photo);
    const id = `story-${this.idGenerator.generate()}`;

    return {
      ...storyCreation,
      lat: storyCreation.lat ? storyCreation.lat : null,
      lon: storyCreation.lon ? storyCreation.lon : null,
      id,
      photoUrl,
      createdAt: new Date().toISOString(),
    };
  }
}

export default StoryCreationAggregate;
