import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import StoriesRouteValidator from './validator';
import StoriesHandler from './handler';
import routes from './routes';

const stories = {
  name: 'stories',
  register: async (server: Server, { container } : { container: Container}) => {
    const validator = new StoriesRouteValidator();
    const handler = new StoriesHandler(container, validator);
    server.route(routes(handler));
  },
};

export default stories;
