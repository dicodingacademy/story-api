import { Server } from '@hapi/hapi';
import routes from './routes';

const homeV1 = {
  name: 'homeV1',
  register: async (server: Server) => {
    server.route(routes());
  },
};

export default homeV1;
