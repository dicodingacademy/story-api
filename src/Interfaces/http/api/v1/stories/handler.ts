import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { StoryPhoto } from '@Domains/stories/entities';
import StoryCreationUseCase from '@Applications/usecase/stories/StoryCreationUseCase';
import StoriesRouteValidator from '@Interfaces/http/api/v1/stories/validator';
import GetAllStoriesUseCase from '@Applications/usecase/stories/GetAllStoriesUseCase';
import GuestStoryCreationUseCase from '@Applications/usecase/stories/GuestStoryCreationUseCase';
import { nanoid } from 'nanoid';
import ResetStoryUseCase from '@Applications/usecase/stories/ResetStoryUseCase';

type Credentials = {
  userId: string;
};

class StoriesHandler {
  private container: Container;

  private validator: StoriesRouteValidator;

  constructor(container: Container, validator: StoriesRouteValidator) {
    this.container = container;
    this.validator = validator;

    this.postStoryHandler = this.postStoryHandler.bind(this);
    this.getStoriesHandler = this.getStoriesHandler.bind(this);
    this.postGuestStoryHandler = this.postGuestStoryHandler.bind(this);
    this.resetStoriesHandler = this.resetStoriesHandler.bind(this);
  }

  async postStoryHandler(request: Request, h: ResponseToolkit) {
    const { userId } = request.auth.credentials as Credentials;
    const payload = this.validator.validatePostStory(request.payload);

    const storyPhoto: StoryPhoto = {
      file: payload.photo,
      meta: {
        filename: `${nanoid(8)}.${payload.photo.hapi.filename.split('.').pop()}`,
        contentType: payload.photo.hapi.headers['content-type'],
      },
    };

    const useCase = this.container.getInstance(StoryCreationUseCase.name) as StoryCreationUseCase;

    await useCase.execute({
      ...payload,
      photo: storyPhoto,
      userId,
    });

    const response = h.response({
      error: false,
      message: 'Story created successfully',
    });
    response.code(201);
    return response;
  }

  async getStoriesHandler(request: Request) {
    const { userId } = request.auth.credentials as Credentials;
    const { location } = request.query;

    const useCase = this.container.getInstance(GetAllStoriesUseCase.name) as GetAllStoriesUseCase;
    const { page, size } = request.query as { page: number; size: number };
    const stories = await useCase.execute({
      userId, size, page, isLocation: Boolean(Number(location)),
    });

    return {
      error: false,
      message: 'Stories fetched successfully',
      listStory: stories,
    };
  }

  async postGuestStoryHandler(request: Request, h: ResponseToolkit) {
    const payload = this.validator.validatePostStory(request.payload);

    const storyPhoto: StoryPhoto = {
      file: payload.photo,
      meta: {
        filename: `${nanoid(8)}.${payload.photo.hapi.filename.split('.').pop()}`,
        contentType: payload.photo.hapi.headers['content-type'],
      },
    };

    const useCase = this.container
      .getInstance(GuestStoryCreationUseCase.name) as GuestStoryCreationUseCase;

    await useCase.execute({
      ...payload,
      photo: storyPhoto,
    });

    const response = h.response({
      error: false,
      message: 'Story created successfully',
    });
    response.code(201);
    return response;
  }

  async resetStoriesHandler() {
    const useCase = this.container.getInstance(ResetStoryUseCase.name) as ResetStoryUseCase;
    await useCase.execute();
    return {
      error: false,
      message: 'Stories reset successfully',
    };
  }
}

export default StoriesHandler;
