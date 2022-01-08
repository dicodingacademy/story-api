import Hapi from '@hapi/hapi';
import { Container } from 'instances-container';
import { preResponseMiddleware } from './utils';
import { registerExternalPlugins, registerInternalPlugins } from './plugins';
import { options } from './config';
import { configureJwtAuth } from './auth';
import { routes } from './routes';

export const createServer = async (container: Container) => {
  const server = Hapi.server(options);

  await registerExternalPlugins(server);
  await configureJwtAuth(server);
  await registerInternalPlugins(server, { container });

  // interpreting the response
  server.ext('onPreResponse', preResponseMiddleware);

  /* initial route */
  server.route(routes);
  return server;
};
