import config from '../../../Commons/config';
import { hourToMillis } from './utils';
import container from '../../../Infrastructures/container';
import DeleteStoryUseCase from '../../../Applications/usecase/stories/DeleteStoryUseCase';
import { CreatedStory } from '../../../Domains/stories/entities';

export const schedulingStoryToDelete = ({ output }: { output: CreatedStory }) => {
  const scheduleInMillis = hourToMillis(Number(config.story.deleteTimeInHours));
  const useCase = container.getInstance(DeleteStoryUseCase.name) as DeleteStoryUseCase;
  console.log(`Scheduling story to delete: ${output.id}`);

  setTimeout(async () => {
    await useCase.execute({ createdStory: output });
    console.log(`Story ${output.id} deleted`);
  }, scheduleInMillis);
};
