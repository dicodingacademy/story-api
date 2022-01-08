import { UserRepository } from '@Domains/users/repository';
import { PasswordHash } from '@Domains/users/security';
import { IdGenerator } from '@Domains/commons/utils';
import UserCreationAggregate from '@Domains/users/aggregate/UserCreationAggregate';
import { UserCreation } from '@Domains/users/entities';
import InvariantError from '@Commons/exceptions/InvariantError';

describe('UserCreationAggregate', () => {
  const userRepository = <UserRepository>{};
  const passwordHash = <PasswordHash>{};
  const idGenerator = <IdGenerator>{};

  const userCreationAggregate = new UserCreationAggregate(
    userRepository, passwordHash, idGenerator,
  );

  describe('createUser', () => {
    it('should throw error when password less than 6 character', async () => {
      // Arrange
      const userCreation: UserCreation = {
        name: 'dimas',
        email: 'dimas@dicoding.com',
        password: 'sec',
      };

      // Action & Assert
      await expect(userCreationAggregate.createUser(userCreation)).rejects.toThrow(InvariantError);
    });

    it('should throw error when email already taken', async () => {
      // Arrange
      const userCreation: UserCreation = {
        name: 'dimas',
        email: 'dimas@dicoding.com',
        password: 'secret',
      };

      userRepository.isEmailAlreadyInUse = jest.fn(() => Promise.resolve(true));

      // Action & Assert
      await expect(userCreationAggregate.createUser(userCreation)).rejects.toThrow(InvariantError);
    });

    it('should encrypt the password', async () => {
      // Arrange
      const userCreation: UserCreation = {
        name: 'dimas',
        email: 'dimas@dicoding.com',
        password: 'secret',
      };

      userRepository.isEmailAlreadyInUse = jest.fn(() => Promise.resolve(false));
      passwordHash.hash = jest.fn(() => Promise.resolve('hashed_secret'));
      idGenerator.generate = jest.fn(() => 'id');

      // Action
      await userCreationAggregate.createUser(userCreation);

      // Assert
      expect(passwordHash.hash).toHaveBeenCalledWith(userCreation.password);
    });

    it('should return created user entities', async () => {
      // Arrange
      const userCreation: UserCreation = {
        name: 'dimas',
        email: 'dimas@dicoding.com',
        password: 'secret',
      };

      userRepository.isEmailAlreadyInUse = jest.fn(() => Promise.resolve(false));
      passwordHash.hash = jest.fn(() => Promise.resolve('hashed_secret'));
      idGenerator.generate = jest.fn(() => '123');

      // Action
      const createdUser = await userCreationAggregate.createUser(userCreation);

      // Assert
      expect(createdUser).toEqual({
        id: 'user-123',
        name: userCreation.name,
        email: userCreation.email,
        hashedPassword: 'hashed_secret',
      });
    });
  });
});
