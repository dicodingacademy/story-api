import { ServerRoute } from '@hapi/hapi';
import StoriesHandler from './handler';

const routes = (handler: StoriesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/stories',
    handler: handler.postStoryHandler,
    options: {
      auth: 'story_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: {
          output: 'stream',
        },
        maxBytes: 500000,
      },
    },
  },
];

export default routes;
