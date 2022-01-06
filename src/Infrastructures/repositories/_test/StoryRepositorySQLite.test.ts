import StoryRepositorySQLite from '../StoryRepositorySQLite';
import { CreatedStory } from '../../../Domains/stories/entities';
import UsersTableTestHelper from './helper/UsersTableTestHelper';
import StoriesTableTestHelper from './helper/StoriesTableTestHelper';

describe('StoryRepositorySQLite', () => {
  const storyRepository = new StoryRepositorySQLite();

  beforeEach(async () => {
    await StoriesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('persist', () => {
    it('should persist a story', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });

      const createdStory: CreatedStory = {
        id: 'story-132',
        userId: 'user-123',
        name: 'dimas',
        description: 'description',
        photoUrl: 'https://photo.com',
        createdAt: 'created_at',
        lat: -6.2,
        lon: 106.1,
      };

      await storyRepository.persist(createdStory);

      const story = await StoriesTableTestHelper.findById('story-132');
      expect(story.id).toBe('story-132');
      expect(story.user_id).toBe('user-123');
      expect(story.description).toBe('description');
      expect(story.photo_url).toBe('https://photo.com');
      expect(story.created_at).toBe('created_at');
      expect(story.lat).toBe(-6.2);
      expect(story.lon).toBe(106.1);
    });
  });
});
