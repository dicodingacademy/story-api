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

  describe('getAllStories', () => {
    it('should return all stories in database', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123', name: 'dimas', email: 'dimas@dicoding.com' });
      await UsersTableTestHelper.addUser({ id: 'user-456', name: 'arif', email: 'arif@dicoding.com' });

      await StoriesTableTestHelper.addStory({
        id: 'story-123',
        userId: 'user-123',
        description: 'description',
        photoUrl: 'https://photo.com',
        lat: -6.2,
        lon: 106.1,
      });

      await StoriesTableTestHelper.addStory({
        id: 'story-456',
        userId: 'user-456',
        description: 'description',
        photoUrl: 'https://photo.com',
        lat: -6.2,
        lon: 106.1,
      });

      const stories = await storyRepository.getAllStories();

      expect(stories.length).toBe(2);

      expect(stories[0].id).toBe('story-123');
      expect(stories[0].name).toBe('dimas');
      expect(stories[0].description).toBe('description');
      expect(stories[0].photoUrl).toBe('https://photo.com');
      expect(stories[0].createdAt).toBeTruthy();
      expect(stories[0].lat).toBe(-6.2);
      expect(stories[0].lon).toBe(106.1);

      expect(stories[1].id).toBe('story-456');
      expect(stories[1].name).toBe('arif');
      expect(stories[1].description).toBe('description');
      expect(stories[1].photoUrl).toBe('https://photo.com');
      expect(stories[1].createdAt).toBeTruthy();
      expect(stories[1].lat).toBe(-6.2);
      expect(stories[1].lon).toBe(106.1);
    });
  });

  describe('deleteStory', () => {
    it('should delete the story', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123', name: 'dimas', email: 'dimas@dicoding.com' });
      await StoriesTableTestHelper.addStory({
        id: 'story-123',
        userId: 'user-123',
        description: 'description',
        photoUrl: 'https://photo.com',
        lat: -6.2,
        lon: 106.1,
      });

      await storyRepository.deleteStory('story-123');

      const story = await StoriesTableTestHelper.findById('story-123');

      expect(story).toBeFalsy();
    });
  });
});
