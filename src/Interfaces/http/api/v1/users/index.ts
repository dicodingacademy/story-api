import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import UsersHandler from './handler';
import UsersRouteValidator from './validator';
import routes from './routes';

const users = {
  name: 'users',
  register: async (server: Server, { container }: { container: Container }) => {
    const validator = new UsersRouteValidator();
    const handler = new UsersHandler(container, validator);

    server.route(routes(handler));
  },
};

export default users;
