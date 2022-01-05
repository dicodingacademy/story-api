import { ApplicationUseCase, UseCaseDependencies } from '../base';
import { UserRepository } from '../../../Domains/users/repository';
import { PasswordHash } from '../../../Domains/users/security';
import { IdGenerator } from '../../../Domains/commons/utils';
import { UserCreation } from '../../../Domains/users/entities';
import UserCreationAggregate from '../../../Domains/users/aggregate/UserCreationAggregate';

class UserCreationUseCase extends ApplicationUseCase<UserCreation, void> {
  private readonly userRepository: UserRepository;

  private readonly passwordHash: PasswordHash;

  private readonly idGenerator: IdGenerator;

  constructor(useCaseDependencies: UseCaseDependencies) {
    super(useCaseDependencies);

    const { userRepository, passwordHash, idGenerator } = useCaseDependencies;
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.idGenerator = idGenerator;
  }

  protected async run(payload: UserCreation): Promise<void> {
    const userCreationAggregate = new UserCreationAggregate(
      this.userRepository,
      this.passwordHash,
      this.idGenerator,
    );

    const createdUser = await userCreationAggregate.createUser(payload);
    await this.userRepository.persist(createdUser);
  }
}

export default UserCreationUseCase;
