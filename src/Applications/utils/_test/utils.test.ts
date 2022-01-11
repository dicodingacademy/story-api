import { getLastPathInUrl } from '@Applications/utils';

describe('utils', () => {
  describe('getLastPathInUrl', () => {
    it('should get the last path in the url', () => {
      expect(getLastPathInUrl('https://www.google.com/search?q=test')).toBe('search');
      expect(getLastPathInUrl('https://www.google.com/search/dimas.jpg')).toBe('dimas.jpg');
      expect(getLastPathInUrl('https://www.google.com/search/dimas.jpg?q=test')).toBe('dimas.jpg');
    });
  });
});
