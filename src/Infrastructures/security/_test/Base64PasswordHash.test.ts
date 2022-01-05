import Base64PasswordHash from '../Base64PasswordHash';

describe('BcryptPasswordHash', () => {
  const passwordHash = new Base64PasswordHash();

  describe('hash', () => {
    it('should hash password correctly', async () => {
      // Arrange
      const plainPassword = 'secret!';

      // Action
      const hashedPassword = await passwordHash.hash(plainPassword);

      // Assert
      await expect(passwordHash.compare(plainPassword, hashedPassword)).resolves.toEqual(true);
    });
  });

  describe('compare', () => {
    it('should return false not match', async () => {
      // Arrange
      const plainPassword = 'secret!';
      const hashed = 'hello!';

      // Action
      const isMatch = await passwordHash.compare(plainPassword, hashed);

      // Assert
      expect(isMatch).toEqual(false);
    });

    it('should return true when password match', async () => {
      // Arrange
      const plainPassword = 'secret';
      const hashed = await passwordHash.hash(plainPassword);

      // Action
      const isMatch = await passwordHash.compare(plainPassword, hashed);

      // Assert
      expect(isMatch).toEqual(true);
    });
  });
});
