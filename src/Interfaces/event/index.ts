import container from '@Infrastructures/container';
import StoryCreationUseCase from '@Applications/usecase/stories/StoryCreationUseCase';
import { ApplicationEvent, ApplicationUseCase } from '@Applications/usecase/base';
import { schedulingGuestStoryToDelete, schedulingStoryToDelete } from '@Interfaces/event/listeners';
import GuestStoryCreationUseCase from '@Applications/usecase/stories/GuestStoryCreationUseCase';

const subscribers = {
  [StoryCreationUseCase.name]: [
    schedulingStoryToDelete,
  ],
  [GuestStoryCreationUseCase.name]: [
    schedulingGuestStoryToDelete,
  ],
};

export const applicationEventSubscriber = () => {
  const applicationEvent = container.getInstance('ApplicationEvent') as ApplicationEvent;
  Object.keys(subscribers).forEach((useCaseKey) => {
    const useCase = container.getInstance(useCaseKey) as ApplicationUseCase<any, any>;
    subscribers[useCaseKey].forEach((subscriber) => {
      applicationEvent.subscribe(useCase, subscriber);
    });
  });
};
