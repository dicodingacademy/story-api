/* istanbul ignore file */
import { ApplicationUseCase, UseCaseDependencies } from '../base';
import { CreatedStory } from '../../../Domains/stories/entities';
import { StoryRepository } from '../../../Domains/stories/repository';
import { StoryStorage } from '../../../Domains/stories/storage';
import { getLastPathInUrl } from '../../utils';

type UseCasePayload = {
  createdStory: CreatedStory
}

class DeleteStoryUseCase extends ApplicationUseCase<UseCasePayload, void> {
  private storyRepository: StoryRepository;

  private storyStorage: StoryStorage;

  constructor(useCaseDependencies: UseCaseDependencies) {
    super(useCaseDependencies);

    const { storyRepository, storyStorage } = useCaseDependencies;
    this.storyRepository = storyRepository;
    this.storyStorage = storyStorage;
  }

  protected async run({ createdStory }: UseCasePayload): Promise<void> {
    const { id, photoUrl } = createdStory;
    const filename = getLastPathInUrl(photoUrl);
    await this.storyStorage.deleteSavedStoryImage(filename);
    await this.storyRepository.deleteStory(id);
  }
}

export default DeleteStoryUseCase;
