/* istanbul ignore file */
import container from '@Infrastructures/container';
import { hourToMillis } from '@Interfaces/event/listeners/utils';
import { CreatedStory } from '@Domains/stories/entities';
import ScheduledDeleteStoryUseCase from '@Applications/usecase/stories/ScheduledDeleteStoryUseCase';
import config from '@Commons/config';

export const schedulingStoryToDelete = ({ output }: { output: CreatedStory }) => {
  const scheduleInMillis = hourToMillis(Number(config.story.deleteTimeInHours));
  const useCase = container.getInstance(
    ScheduledDeleteStoryUseCase.name,
  ) as ScheduledDeleteStoryUseCase;
  console.log(`Scheduling story to delete: ${output.id}`);

  setTimeout(async () => {
    try {
      await useCase.execute({ createdStory: output });
    } catch (error) {
      console.log(`failed delete scheduled story: ${output.id}`);
    }
  }, scheduleInMillis);
};

export const schedulingGuestStoryToDelete = ({ output } : { output: CreatedStory }) => {
  const scheduleInMillis = hourToMillis(Number(config.story.guestDeleteTimeInHours));
  const useCase = container.getInstance(
    ScheduledDeleteStoryUseCase.name,
  ) as ScheduledDeleteStoryUseCase;
  console.log(`Scheduling guest story to delete: ${output.id}`);

  setTimeout(async () => {
    try {
      await useCase.execute({ createdStory: output });
    } catch (error) {
      console.log(`failed delete scheduled story: ${output.id}`);
    }
  }, scheduleInMillis);
};
