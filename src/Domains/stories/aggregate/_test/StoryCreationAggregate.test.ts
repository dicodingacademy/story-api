import { StoryStorage } from '@Domains/stories/storage';
import { IdGenerator } from '@Domains/commons/utils';
import StoryCreationAggregate from '@Domains/stories/aggregate/StoryCreationAggregate';
import { StoryCreation, StoryPhoto } from '@Domains/stories/entities';

describe('StoryCreationAggregate', () => {
  const storyStorage = <StoryStorage>{};
  const idGenerator = <IdGenerator>{};

  const aggregate = new StoryCreationAggregate(
    storyStorage,
    idGenerator,
  );

  it('should return created story without lat and lon', async () => {
    storyStorage.saveStoryImage = jest.fn(() => Promise.resolve('https://image.com'));
    idGenerator.generate = jest.fn(() => '123');

    const storyCreation: StoryCreation = {
      userId: 'user-123',
      name: 'dimas',
      description: 'Lorem ipsum',
      photo: <StoryPhoto>{},
    };

    const createdStory = await aggregate.createStory(storyCreation);

    expect(createdStory.id).toBe('story-123');
    expect(createdStory.userId).toBe('user-123');
    expect(createdStory.name).toBe('dimas');
    expect(createdStory.description).toBe('Lorem ipsum');
    expect(createdStory.photoUrl).toBe('https://image.com');
    expect(createdStory.lat).toBe(null);
    expect(createdStory.lon).toBe(null);
    expect(createdStory.createdAt).toBeDefined();
  });

  it('should return created story without lat and lon', async () => {
    storyStorage.saveStoryImage = jest.fn(() => Promise.resolve('https://image.com'));
    idGenerator.generate = jest.fn(() => '123');

    const storyCreation: StoryCreation = {
      userId: 'user-123',
      name: 'dimas',
      description: 'Lorem ipsum',
      photo: <StoryPhoto>{},
      lat: -6.2,
      lon: 106.1,
    };

    const createdStory = await aggregate.createStory(storyCreation);

    expect(createdStory.id).toBe('story-123');
    expect(createdStory.userId).toBe('user-123');
    expect(createdStory.name).toBe('dimas');
    expect(createdStory.description).toBe('Lorem ipsum');
    expect(createdStory.photoUrl).toBe('https://image.com');
    expect(createdStory.lat).toBe(-6.2);
    expect(createdStory.lon).toBe(106.1);
    expect(createdStory.createdAt).toBeDefined();
  });
});
