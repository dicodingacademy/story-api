import Joi, { ObjectSchema } from 'joi';
import InvariantError from '@Commons/exceptions/InvariantError';

type UsersRouteSchema = {
  postUser: ObjectSchema
  loginUser: ObjectSchema
}

type PostUserPayload = {
  name: string;
  email: string;
  password: string;
}

class UsersRouteValidator {
  private schemas: UsersRouteSchema;

  constructor() {
    this.schemas = {
      postUser: Joi.object({
        name: Joi.string().required().error(new InvariantError('name is required')),
        email: Joi.string().email().required().error(new InvariantError('email is required or wrong format')),
        password: Joi.string().required().error(new InvariantError('password is required')),
      }),

      loginUser: Joi.object({
        email: Joi.string().email().required().error(new InvariantError('email is required or wrong format')),
        password: Joi.string().required().error(new InvariantError('password is required')),
      }),
    };
  }

  validatePostUser(payload: unknown) {
    const validationResult = this.schemas.postUser.validate(payload || {});
    if (validationResult.error) {
      throw validationResult.error;
    }

    return validationResult.value as PostUserPayload;
  }

  validateLoginUser(payload: unknown) {
    const validationResult = this.schemas.loginUser.validate(payload || {});
    if (validationResult.error) {
      throw validationResult.error;
    }

    return validationResult.value as PostUserPayload;
  }
}

export default UsersRouteValidator;
