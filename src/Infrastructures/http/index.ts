import Hapi from '@hapi/hapi';
import { Container } from 'instances-container';
import { options } from '@Infrastructures/http/config';
import { registerExternalPlugins, registerInternalPlugins } from '@Infrastructures/http/plugins';
import { configureJwtAuth } from '@Infrastructures/http/auth';
import { preResponseMiddleware } from '@Infrastructures/http/utils';
import { routes } from '@Infrastructures/http/routes';

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
