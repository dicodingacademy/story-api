import Hapi, { Request, ResponseToolkit } from '@hapi/hapi';
import Inert from '@hapi/inert';
import { Container } from 'instances-container';
import Jwt from '@hapi/jwt';
import { resolve } from 'path';
import config from '../../Commons/config';
import users from '../../Interfaces/http/api/v1/users';
import ClientError from '../../Commons/exceptions/ClientError';
import stories from '../../Interfaces/http/api/v1/stories';
import secureResponse from './secureResponse';
import homeV1 from '../../Interfaces/http/api/v1/home';

export const createServer = async (container: Container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    routes: {
      cors: true,
    },
  });

  await server.register([
    {
      plugin: Jwt.plugin,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('story_jwt', 'jwt', {
    keys: config.tokenize.secret,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.tokenize.age,
    },
    validate: (artifacts: any) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
      },
    }),
  });

  /* initial route */
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: () => ({ message: 'Hello World!' }),
    },
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: resolve(__dirname, '../../Interfaces/http/public'),
        },
      },
    },
  ]);

  /* v1 */
  await server.register([
    {
      plugin: users,
      options: { container },
      routes: {
        prefix: '/v1',
      },
    },
    {
      plugin: stories,
      options: { container },
      routes: {
        prefix: '/v1',
      },
    },
    {
      plugin: homeV1,
      routes: {
        prefix: '/v1',
      },
    },
  ]);

  server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          error: true,
          message: response.message,
        });

        newResponse.code(response.statusCode);
        return secureResponse(newResponse);
      }

      if (!response.isServer) {
        return response;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kesalahan pada server kami',
      });
      newResponse.code(500);
      return secureResponse(newResponse);
    }

    return secureResponse(response);
  });

  return server;
};
