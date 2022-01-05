import Hapi from '@hapi/hapi';
import config from '../../Commons/config';

export const createServer = async () => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello, world!' }),
  });

  return server;
};
