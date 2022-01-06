import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import StoriesRouteValidator from './validator';
import StoryCreationUseCase from '../../../../../Applications/usecase/stories/StoryCreationUseCase';
import { StoryPhoto } from '../../../../../Domains/stories/entities';

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
  }

  async postStoryHandler(request: Request, h: ResponseToolkit) {
    const { userId } = request.auth.credentials as Credentials;
    const payload = this.validator.validatePostStory(request.payload);

    const storyPhoto: StoryPhoto = {
      file: payload.photo,
      meta: {
        filename: payload.photo.hapi.filename,
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
}

export default StoriesHandler;
