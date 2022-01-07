import { createServer } from './Infrastructures/http';
import container from './Infrastructures/container';
import { applicationEventSubscriber } from './Interfaces/event';
import ResetStoryUseCase from './Applications/usecase/stories/ResetStoryUseCase';

const resetStories = async () => {
  const useCase = container.getInstance(ResetStoryUseCase.name) as ResetStoryUseCase;
  await useCase.execute();
  console.log('Stories has been reset');
};

(async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  await resetStories();
  applicationEventSubscriber();
  console.log('Application event started');
})();
