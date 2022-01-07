import Hapi, { Request, ResponseToolkit } from '@hapi/hapi';
import { Container } from 'instances-container';
import Jwt from '@hapi/jwt';
import config from '../../Commons/config';
import users from '../../Interfaces/http/api/v1/users';
import ClientError from '../../Commons/exceptions/ClientError';
import stories from '../../Interfaces/http/api/v1/stories';

export const createServer = async (container: Container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    routes: {
      cors: true,
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello, world!' }),
  });

  await server.register([
    {
      plugin: Jwt.plugin,
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
        return newResponse;
      }

      if (!response.isServer) {
        return response;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kesalahan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return response;
  });

  return server;
};
