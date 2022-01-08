import { UserLogin } from '@Domains/users/entities';
import { Authenticated } from '@Domains/authentications/entities';
import { UserRepository } from '@Domains/users/repository';
import { PasswordHash } from '@Domains/users/security';
import { Tokenize } from '@Domains/authentications/tokenize';
import UserLoginAggregate from '@Domains/users/aggregate/UserLoginAggregate';
import { ApplicationUseCase, UseCaseDependencies } from '@Applications/usecase/base';

class LoginUseCase extends ApplicationUseCase<UserLogin, Authenticated> {
  private readonly userRepository: UserRepository;

  private readonly passwordHash: PasswordHash;

  private tokenize: Tokenize;

  constructor(useCaseDependencies : UseCaseDependencies) {
    super(useCaseDependencies);

    const {
      userRepository, passwordHash, tokenize,
    } = useCaseDependencies;

    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.tokenize = tokenize;
  }

  protected async run(userLogin: UserLogin): Promise<Authenticated> {
    const userLoginAggregate = new UserLoginAggregate(
      this.userRepository,
      this.passwordHash,
    );

    const createdUser = await userLoginAggregate.login(userLogin);

    const token = await this.tokenize.createAccessToken({
      userId: createdUser.id,
    });

    return {
      userId: createdUser.id,
      name: createdUser.name,
      token,
    };
  }
}

export default LoginUseCase;
