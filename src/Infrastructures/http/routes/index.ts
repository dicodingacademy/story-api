import { resolve } from 'path';
import { ServerRoute } from '@hapi/hapi';

export const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello World!' }),
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: resolve(__dirname, '../../../Interfaces/http/public'),
      },
    },
  },
];
