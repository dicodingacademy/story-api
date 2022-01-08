import { UserRepository } from '@Domains/users/repository';
import { PasswordHash } from '@Domains/users/security';
import UserLoginAggregate from '@Domains/users/aggregate/UserLoginAggregate';
import AuthenticationError from '@Commons/exceptions/AuthenticationError';

describe('UserLoginAggregate', () => {
  const userRepository = <UserRepository>{};
  const passwordHash = <PasswordHash>{};
  const userLoginAggregate = new UserLoginAggregate(userRepository, passwordHash);

  it('should throw error when user not found', async () => {
    const userLogin = {
      email: 'dimas@dicoding.com',
      password: '12345678',
    };
    userRepository.findByEmail = jest.fn(() => Promise.resolve(null));

    await expect(userLoginAggregate.login(userLogin))
      .rejects
      .toThrowError(AuthenticationError);
  });

  it('should throw error when password not match', async () => {
    const userLogin = {
      email: 'dimas@dicoding.com',
      password: '12345678',
    };

    const createdUser = {
      id: 'user-123',
      email: 'dimas@dicoding.com',
      name: 'Dimas',
      hashedPassword: 'hashedPassword',
    };

    userRepository.findByEmail = jest.fn(() => Promise.resolve(createdUser));
    passwordHash.compare = jest.fn(() => Promise.resolve(false));

    await expect(userLoginAggregate.login(userLogin))
      .rejects
      .toThrowError(AuthenticationError);
  });

  it('should return correct registered user', async () => {
    const userLogin = {
      email: 'dimas@dicoding.com',
      password: '12345678',
    };

    const createdUser = {
      id: 'user-123',
      email: 'dimas@dicoding.com',
      name: 'Dimas',
      hashedPassword: 'hashedPassword',
    };

    userRepository.findByEmail = jest.fn(() => Promise.resolve(createdUser));
    passwordHash.compare = jest.fn(() => Promise.resolve(true));

    const result = await userLoginAggregate.login(userLogin);

    expect(result).toEqual({
      id: 'user-123',
      email: 'dimas@dicoding.com',
      name: 'Dimas',
      hashedPassword: 'hashedPassword',
    });
  });
});
