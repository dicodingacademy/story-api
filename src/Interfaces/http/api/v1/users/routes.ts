import { ServerRoute } from '@hapi/hapi';
import UsersHandler from './handler';

const routes = (handler: UsersHandler) : ServerRoute[] => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.postUserHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: handler.postLoginHandler,
  },
];

export default routes;
