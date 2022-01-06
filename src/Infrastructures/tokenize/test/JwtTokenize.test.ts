import Jwt from '@hapi/jwt';
import JwtTokenize from '../JwtTokenize';
import config from '../../../Commons/config';

describe('JwtTokenize', () => {
  const tokenize = new JwtTokenize();

  describe('createAccessToken', () => {
    it('should create access token correctly', async () => {
      // Arrange
      const tokenPayload = {
        userId: 'user-123',
      };

      // Action
      const token = await tokenize.createAccessToken(tokenPayload);

      // Assert
      const artifacts = Jwt.token.decode(token);
      const { decoded: { payload } } = artifacts;
      expect(() => Jwt.token.verify(artifacts, config.tokenize.secret)).not.toThrow();
      expect(payload.userId).toBe(tokenPayload.userId);
      expect(payload.iat).toBeTruthy();
    });
  });
});
