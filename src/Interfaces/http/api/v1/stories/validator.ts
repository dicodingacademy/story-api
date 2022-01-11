// eslint-disable-next-line max-classes-per-file
import Joi, { ObjectSchema } from 'joi';
import { Readable } from 'stream';
import InvariantError from '@Commons/exceptions/InvariantError';

type StoriesRouteSchema = {
  postStory: ObjectSchema,
}

type HapiReadableProps = {
  filename: string;
  headers: any;
}
abstract class HapiReadable extends Readable {
  public hapi: HapiReadableProps;
}

type PostStoryPayload = {
  description: string,
  photo: HapiReadable,
  lat?: number,
  lon?: number,
}

class StoriesRouteValidator {
  private schemas: StoriesRouteSchema;

  constructor() {
    this.schemas = {
      postStory: Joi.object({
        description: Joi.string().required().error(new InvariantError('description is required and should be string')),
        lat: Joi.number().error(new InvariantError('lat should be number')),
        lon: Joi.number().error(new InvariantError('lon should be number')),
        photo: Joi.any().required().error(new InvariantError('photo is required')),
      }),
    };
  }

  validatePostStory(payload: any): PostStoryPayload {
    const validationResult = this.schemas.postStory.validate(payload || {});

    if (validationResult.error) {
      throw validationResult.error;
    }

    const { photo } = payload;

    if (!(photo instanceof Readable)) {
      throw new InvariantError('photo should be Readable');
    }

    return validationResult.value as PostStoryPayload;
  }
}

export default StoriesRouteValidator;
