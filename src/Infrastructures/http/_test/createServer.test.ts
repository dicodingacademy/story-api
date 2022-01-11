import { Server } from '@hapi/hapi';
import { createServer } from '@Infrastructures/http';
import container from '@Infrastructures/container';

describe('createServer', () => {
  let server: Server;

  beforeAll(async () => {
    server = await createServer(container);
  });

  describe('when GET /', () => {
    it('should return 200', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('when request unknown route', () => {
    it('should return 404', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/unknown',
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('when server error', () => {
    it('should return 500', async () => {
      server.route({
        method: 'GET',
        path: '/error',
        handler: () => {
          throw new Error('test');
        },
      });
      const response = await server.inject({
        method: 'GET',
        url: '/error',
      });

      expect(response.statusCode).toBe(500);
    });
  });
});
