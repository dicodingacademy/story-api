import { ApplicationUseCase, UseCaseDependencies } from '../base';
import { CreatedStory, StoryPhoto } from '../../../Domains/stories/entities';
import { UserRepository } from '../../../Domains/users/repository';
import { StoryRepository } from '../../../Domains/stories/repository';
import { IdGenerator } from '../../../Domains/commons/utils';
import { StoryStorage } from '../../../Domains/stories/storage';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError';
import StoryCreationAggregate from '../../../Domains/stories/aggregate/StoryCreationAggregate';

type UseCasePayload = {
  userId: string;
  description: string;
  title: string;
  photo: StoryPhoto;
  lat?: number;
  long?: number;
};

class StoryCreationUseCase extends ApplicationUseCase<UseCasePayload, CreatedStory> {
  private userRepository: UserRepository;

  private storyRepository: StoryRepository;

  private readonly idGenerator: IdGenerator;

  private readonly storyStorage: StoryStorage;

  constructor(useCaseDependencies: UseCaseDependencies) {
    super(useCaseDependencies);
    const {
      userRepository, storyRepository, idGenerator, storyStorage,
    } = useCaseDependencies;
    this.userRepository = userRepository;
    this.storyRepository = storyRepository;
    this.idGenerator = idGenerator;
    this.storyStorage = storyStorage;
  }

  protected async run(payload: UseCasePayload): Promise<CreatedStory> {
    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const storyCreationAggregate = new StoryCreationAggregate(
      this.storyStorage,
      this.idGenerator,
    );

    const createdStory = await storyCreationAggregate.createStory({
      ...payload,
      name: user.name,
    });

    await this.storyRepository.persist(createdStory);

    return createdStory;
  }
}

export default StoryCreationUseCase;
