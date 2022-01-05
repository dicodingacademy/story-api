import { createServer } from './Infrastructures/http';
import container from './Infrastructures/container';
import { applicationEventSubscriber } from './Interfaces/event';

(async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  applicationEventSubscriber();
  console.log('Application event started');
})();
