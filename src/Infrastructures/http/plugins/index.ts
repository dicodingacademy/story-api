import Inert from '@hapi/inert';
import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import users from '../../../Interfaces/http/api/v1/users';
import stories from '../../../Interfaces/http/api/v1/stories';
import homeV1 from '../../../Interfaces/http/api/v1/home';

const externalPlugins = () => [
  {
    plugin: Inert,
  },
];

const internalPlugins = ({ container } : { container :Container}) => [
  /* V1 */
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
];

export const registerExternalPlugins = async (server: Server) => {
  await server.register(externalPlugins());
};

export const registerInternalPlugins = async (server: Server, options?: any) => {
  await server.register(internalPlugins(options));
};
