import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import UsersRouteValidator from './validator';
import UserCreationUseCase from '../../../../Applications/usecase/users/UserCreationUseCase';

class UsersHandler {
  private container: Container;

  private validator: UsersRouteValidator;

  constructor(container: Container, validator: UsersRouteValidator) {
    this.container = container;
    this.validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request: Request, h: ResponseToolkit) {
    const payload = this.validator.validatePostUser(request.payload);
    const useCase = this.container.getInstance(UserCreationUseCase.name) as UserCreationUseCase;

    await useCase.execute(payload);

    const response = h.response({
      error: false,
      message: 'User created',
    });
    response.code(201);
    return response;
  }
}

export default UsersHandler;
