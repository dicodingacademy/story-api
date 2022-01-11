import { UserRepository } from '@Domains/users/repository';
import { PasswordHash } from '@Domains/users/security';
import { UserLogin } from '@Domains/users/entities';
import AuthenticationError from '@Commons/exceptions/AuthenticationError';

class UserLoginAggregate {
  private userRepository: UserRepository;

  private passwordHash: PasswordHash;

  constructor(userRepository: UserRepository, passwordHash: PasswordHash) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async login({ email, password }: UserLogin) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const isPasswordMatch = await this.passwordHash.compare(password, user.hashedPassword);

    if (!isPasswordMatch) {
      throw new AuthenticationError('Invalid password');
    }

    return user;
  }
}

export default UserLoginAggregate;
