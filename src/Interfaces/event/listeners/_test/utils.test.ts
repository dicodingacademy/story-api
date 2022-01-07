import { hourToMillis } from '../utils';

describe('utils', () => {
  describe('hourToMillis', () => {
    it('should convert hour to millis', () => {
      expect(hourToMillis(1)).toBe(3600000);
      expect(hourToMillis(2)).toBe(7200000);
      expect(hourToMillis(0.005)).toBe(18000);
    });
  });
});
