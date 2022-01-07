/* istanbul ignore file */

import { ServerRoute } from '@hapi/hapi';

const routes = () : ServerRoute[] => [
  {
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'This will be documentation!' }),
  },
];
export default routes;
