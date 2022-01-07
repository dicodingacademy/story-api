import container from '../../Infrastructures/container';
import { ApplicationEvent, ApplicationUseCase } from '../../Applications/usecase/base';
import { schedulingStoryToDelete } from './listeners';
import StoryCreationUseCase from '../../Applications/usecase/stories/StoryCreationUseCase';

const subscribers = {
  [StoryCreationUseCase.name]: [
    schedulingStoryToDelete,
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
