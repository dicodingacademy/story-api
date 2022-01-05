import UserCreationUseCase from '../../Applications/usecase/users/UserCreationUseCase';
import container from '../../Infrastructures/container';
import { ApplicationEvent, ApplicationUseCase } from '../../Applications/usecase/base';

const subscribers = {
  [UserCreationUseCase.name]: [
    () => {},
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
