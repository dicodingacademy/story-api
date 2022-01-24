import { ApplicationUseCase, UseCaseDependencies } from '@Applications/usecase/base';
import { CreatedStory, StoryPhoto } from '@Domains/stories/entities';
import { StoryRepository } from '@Domains/stories/repository';
import { IdGenerator } from '@Domains/commons/utils';
import StoryCreationAggregate from '@Domains/stories/aggregate/StoryCreationAggregate';
import { StoryStorage } from '@Domains/stories/storage';

type UseCasePayload = {
  description: string;
  photo: StoryPhoto;
  lat?: number;
  long?: number;
};

class GuestStoryCreationUseCase extends ApplicationUseCase<UseCasePayload, CreatedStory> {
  private readonly storyRepository: StoryRepository;

  private readonly idGenerator: IdGenerator;

  private readonly storyStorage: StoryStorage;

  constructor(useCaseDependencies: UseCaseDependencies) {
    super(useCaseDependencies);
    const { storyRepository, idGenerator, storyStorage } = useCaseDependencies;
    this.storyRepository = storyRepository;
    this.idGenerator = idGenerator;
    this.storyStorage = storyStorage;
  }

  protected async run(payload: UseCasePayload): Promise<CreatedStory> {
    const storyCreationAggregate = new StoryCreationAggregate(
      this.storyStorage,
      this.idGenerator,
    );

    const createdStory = await storyCreationAggregate.createStory({
      userId: 'user-guest',
      name: 'Guest',
      ...payload,
    });

    await this.storyRepository.persist(createdStory);
    return createdStory;
  }
}

export default GuestStoryCreationUseCase;
