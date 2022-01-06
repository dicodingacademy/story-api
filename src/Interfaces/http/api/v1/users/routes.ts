import { ServerRoute } from '@hapi/hapi';
import UsersHandler from './handler';

const routes = (handler: UsersHandler) : ServerRoute[] => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.postUserHandler,
  },
];

export default routes;
