import { Server } from '@hapi/hapi';
import UsersTableTestHelper from '../../../repositories/_test/helper/UsersTableTestHelper';
import { createServer } from '../../index';
import container from '../../../container';
import { applicationEventSubscriber } from '../../../../Interfaces/event';
import { ApplicationEvent } from '../../../../Applications/usecase/base';
import UserCreationUseCase from '../../../../Applications/usecase/users/UserCreationUseCase';

describe('when /v1/register', () => {
  let server: Server;

  beforeAll(() => {
    applicationEventSubscriber();
  });

  beforeEach(async () => {
    await UsersTableTestHelper.cleanTable();
    server = await createServer(container);
  });

  describe('POST', () => {
    it('should response 400 when payload not application/json', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
      });

      expect(response.statusCode)
        .toBe(400);
    });

    it('should response 400 when given invalid payload', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload: {
          name: 'dimas',
          email: 'dimas.com',
          password: '123',
        },
      });

      expect(response.statusCode)
        .toBe(400);
    });

    it('should response 400 when email already use', async () => {
      await UsersTableTestHelper.addUser({ email: 'dimas@dicoding.com' });
      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload: {
          name: 'dimas',
          email: 'dimas@dicoding.com',
          password: '123456',
        },
      });

      expect(response.statusCode)
        .toBe(400);
    });

    it('should response 201 when user registered', async () => {
      const applicationEvent = container.getInstance('ApplicationEvent') as ApplicationEvent;
      const spy = jest.spyOn(applicationEvent, 'raise');

      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload: {
          name: 'dimas',
          email: 'dimas@dicoding.com',
          password: '123456',
        },
      });

      expect(response.statusCode).toBe(201);
      expect(spy).toHaveBeenCalledWith(
        container.getInstance(UserCreationUseCase.name),
        expect.any(Object),
      );
    });
  });
});
