import { compare } from 'bcrypt';
import BcryptPasswordHash from '../BcryptPasswordHash';

// skip due long running
xdescribe('BcryptPasswordHash', () => {
  // because it's big transpiling
  jest.setTimeout(10000);
  const bcryptPasswordHash = new BcryptPasswordHash();

  describe('hash', () => {
    it('should hash password correctly', async () => {
      // Arrange
      const plainPassword = 'secret!';

      // Action
      const hashedPassword = await bcryptPasswordHash.hash(plainPassword);

      // Assert
      await expect(compare(plainPassword, hashedPassword)).resolves.toEqual(true);
    });
  });

  describe('compare', () => {
    it('should return false not match', async () => {
      // Arrange
      const plainPassword = 'secret!';
      const hashed = 'hello!';

      // Action
      const isMatch = await bcryptPasswordHash.compare(plainPassword, hashed);

      // Assert
      expect(isMatch).toEqual(false);
    });

    it('should return true when password match', async () => {
      // Arrange
      const plainPassword = 'secret';
      const hashed = await bcryptPasswordHash.hash(plainPassword);

      // Action
      const isMatch = await bcryptPasswordHash.compare(plainPassword, hashed);

      // Assert
      expect(isMatch).toEqual(true);
    });
  });
});
