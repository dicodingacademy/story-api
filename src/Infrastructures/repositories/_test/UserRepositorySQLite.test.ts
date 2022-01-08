import { CreatedUser } from '@Domains/users/entities';
import UsersTableTestHelper from '@Infrastructures/repositories/_test/helper/UsersTableTestHelper';
import UserRepositorySQLite from '@Infrastructures/repositories/UserRepositorySQLite';

describe('UserRepositorySQLite', () => {
  const userRepository = new UserRepositorySQLite();

  beforeEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('persist', () => {
    it('should persist a user', async () => {
      // Arrange
      const createdUser: CreatedUser = {
        id: 'user-123',
        name: 'dimas',
        email: 'dimas@dicoding.com',
        hashedPassword: 'hashed_password',
      };

      // Action
      await userRepository.persist(createdUser);

      // Assert
      const user = await UsersTableTestHelper.findUserByEmail(createdUser.email);
      expect(user.id).toBe(createdUser.id);
      expect(user.name).toBe(createdUser.name);
      expect(user.email).toBe(createdUser.email);
      expect(user.hashed_password).toBe(createdUser.hashedPassword);
    });
  });

  describe('isEmailAlreadyInUse', () => {
    it('should return true if email already in use', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ email: 'dimas@dicoding.com' });
      const email = 'dimas@dicoding.com';

      // Action
      const isEmailAlreadyInUse = await userRepository.isEmailAlreadyInUse(email);

      // Assert
      expect(isEmailAlreadyInUse).toBe(true);
    });

    it('should return false if email not in use', async () => {
      // Arrange
      const email = 'dimas@dicoding.com';

      // Action
      const isEmailAlreadyInUse = await userRepository.isEmailAlreadyInUse(email);

      // Assert
      expect(isEmailAlreadyInUse).toBe(false);
    });
  });

  describe('findByEmail', () => {
    it('should return null if not found', async () => {
      // Arrange
      const email = 'dimas@dicoding.com';

      // Action
      const user = await userRepository.findByEmail(email);

      // Assert
      expect(user).toBeNull();
    });

    it('should return correct user', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ email: 'dimas@dicoding.com' });
      const email = 'dimas@dicoding.com';

      // Action
      const user = await userRepository.findByEmail(email);

      // Assert
      expect(user.email).toBe(email);
    });
  });

  describe('findById', () => {
    it('should return null if not found', async () => {
      // Arrange
      const id = 'user-123';

      // Action
      const user = await userRepository.findById(id);

      // Assert
      expect(user).toBeNull();
    });

    it('should return correct user', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      const id = 'user-123';

      // Action
      const user = await userRepository.findById(id);

      // Assert
      expect(user.id).toBe(id);
    });
  });
});
