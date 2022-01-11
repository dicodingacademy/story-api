import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import LoginUseCase from '@Applications/usecase/authentications/LoginUseCase';
import UserCreationUseCase from '@Applications/usecase/users/UserCreationUseCase';
import UsersRouteValidator from './validator';

class UsersHandler {
  private container: Container;

  private validator: UsersRouteValidator;

  constructor(container: Container, validator: UsersRouteValidator) {
    this.container = container;
    this.validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.postLoginHandler = this.postLoginHandler.bind(this);
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

  async postLoginHandler(request: Request) {
    const payload = this.validator.validateLoginUser(request.payload);
    const useCase = this.container.getInstance(LoginUseCase.name) as LoginUseCase;

    const loginResult = await useCase.execute(payload);

    return {
      error: false,
      message: 'success',
      loginResult,
    };
  }
}

export default UsersHandler;
