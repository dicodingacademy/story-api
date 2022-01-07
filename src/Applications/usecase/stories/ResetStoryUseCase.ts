/* istanbul ignore file */
import { ApplicationUseCase, UseCaseDependencies } from '../base';
import { StoryRepository } from '../../../Domains/stories/repository';
import { Story } from '../../../Domains/stories/entities';
import { StoryStorage } from '../../../Domains/stories/storage';
import { getLastPathInUrl } from '../../utils';

class ResetStoryUseCase extends ApplicationUseCase<void, void> {
  private storyRepository: StoryRepository;

  private storyStorage: StoryStorage;

  constructor(dependencies: UseCaseDependencies) {
    super(dependencies);
    const { storyRepository, storyStorage } = dependencies;
    this.storyRepository = storyRepository;
    this.storyStorage = storyStorage;

    this.deleteStory = this.deleteStory.bind(this);
  }

  protected async run(): Promise<void> {
    const storyToDelete = await this.storyRepository.getAllStoriesExpectFromDicoding();
    const promisesToRun = storyToDelete.map(this.deleteStory);
    await Promise.all(promisesToRun);
  }

  private async deleteStory(story: Story): Promise<void> {
    await this.storyRepository.deleteStory(story.id);
    const filename = getLastPathInUrl(story.photoUrl);
    await this.storyStorage.deleteSavedStoryImage(filename);
  }
}

export default ResetStoryUseCase;
