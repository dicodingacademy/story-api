import { StoryRepository } from '../repository';
import { CreatedStory, StoryCreation } from '../entities';
import { StoryStorage } from '../storage';
import { IdGenerator } from '../../commons/utils';

class StoryCreationAggregate {
  private storyRepository: StoryRepository;

  private storyStorage: StoryStorage;

  private idGenerator: IdGenerator;

  constructor(
    storyRepository: StoryRepository,
    storyStorage: StoryStorage,
    idGenerator: IdGenerator,
  ) {
    this.storyRepository = storyRepository;
    this.storyStorage = storyStorage;
    this.idGenerator = idGenerator;
  }

  async createStory(storyCreation: StoryCreation): Promise<CreatedStory> {
    const photoUrl = await this.storyStorage.saveStoryImage(storyCreation.photo);
    const id = `story-${this.idGenerator.generate()}`;

    return {
      ...storyCreation,
      id,
      photoUrl,
      createdAt: new Date().toISOString(),
    };
  }
}

export default StoryCreationAggregate;
