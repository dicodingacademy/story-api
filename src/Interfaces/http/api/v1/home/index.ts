import { Server } from '@hapi/hapi';
import routes from '@Interfaces/http/api/v1/home/routes';

const homeV1 = {
  name: 'homeV1',
  register: async (server: Server) => {
    server.route(routes());
  },
};

export default homeV1;
