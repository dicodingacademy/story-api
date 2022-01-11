import { ServerRoute } from '@hapi/hapi';
import StoriesHandler from '@Interfaces/http/api/v1/stories/handler';

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
        parse: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    method: 'GET',
    path: '/stories',
    handler: handler.getStoriesHandler,
    options: {
      auth: 'story_jwt',
    },
  },
];

export default routes;
