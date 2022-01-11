import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import StoriesRouteValidator from '@Interfaces/http/api/v1/stories/validator';
import StoriesHandler from '@Interfaces/http/api/v1/stories/handler';
import routes from '@Interfaces/http/api/v1/stories/routes';

const stories = {
  name: 'stories',
  register: async (server: Server, { container } : { container: Container}) => {
    const validator = new StoriesRouteValidator();
    const handler = new StoriesHandler(container, validator);
    server.route(routes(handler));
  },
};

export default stories;
