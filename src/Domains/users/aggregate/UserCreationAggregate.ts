import { UserRepository } from '../repository';
import { CreatedUser, UserCreation } from '../entities';
import { PasswordHash } from '../security';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import { IdGenerator } from '../../commons/utils';

class UserCreationAggregate {
  private userRepository: UserRepository;

  private passwordHash: PasswordHash;

  private idGenerator: IdGenerator;

  constructor(
    userRepository: UserRepository,
    passwordHash: PasswordHash,
    idGenerator: IdGenerator,
  ) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.idGenerator = idGenerator;
  }

  public async createUser({ name, password, email }: UserCreation) : Promise<CreatedUser> {
    if (password.length < 6) {
      throw new InvariantError('Password must be at least 6 characters long');
    }

    const isEmailTaken = await this.userRepository.isEmailAlreadyInUse(email);

    if (isEmailTaken) {
      throw new InvariantError('Email is already taken');
    }

    const hashedPassword = await this.passwordHash.hash(password);

    return {
      id: `user-${this.idGenerator.generate()}`,
      name,
      email,
      hashedPassword,
    };
  }
}

export default UserCreationAggregate;
