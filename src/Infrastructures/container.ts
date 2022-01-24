/* istanbul ignore file */

import { createContainer, ParameterOption } from 'instances-container';
import StoryCreationUseCase from '@Applications/usecase/stories/StoryCreationUseCase';
import BcryptPasswordHash from '@Infrastructures/security/BcryptPasswordHash';
import LocalStoryStorage from '@Infrastructures/storage/LocalStoryStorage';
import LoginUseCase from '@Applications/usecase/authentications/LoginUseCase';
import ResetStoryUseCase from '@Applications/usecase/stories/ResetStoryUseCase';
import NanoIdGenerator from '@Infrastructures/utils/NanoIdGenerator';
import Base64PasswordHash from '@Infrastructures/security/Base64PasswordHash';
import JwtTokenize from '@Infrastructures/tokenize/JwtTokenize';
import GetAllStoriesUseCase from '@Applications/usecase/stories/GetAllStoriesUseCase';
import StoryRepositorySQLite from '@Infrastructures/repositories/StoryRepositorySQLite';
import ApplicationEventImpl from '@Infrastructures/event/ApplicationEventImpl';
import UserRepositorySQLite from '@Infrastructures/repositories/UserRepositorySQLite';
import UserCreationUseCase from '@Applications/usecase/users/UserCreationUseCase';
import ScheduledDeleteStoryUseCase from '@Applications/usecase/stories/ScheduledDeleteStoryUseCase';
import FileLogger from '@Infrastructures/logging/local/FileLogger';

const container = createContainer();

/** definitions */
const useCaseParameter: ParameterOption = {
  injectType: 'destructuring',
  dependencies: [
    {
      name: 'userRepository',
      internal: 'UserRepository',
    },
    {
      name: 'passwordHash',
      internal: 'PasswordHash',
    },
    {
      name: 'applicationEvent',
      internal: 'ApplicationEvent',
    },
    {
      name: 'idGenerator',
      internal: 'IdGenerator',
    },
    {
      name: 'tokenize',
      internal: 'Tokenize',
    },
    {
      name: 'storyRepository',
      internal: 'StoryRepository',
    },
    {
      name: 'storyStorage',
      internal: 'StoryStorage',
    },
  ],
};

/** repository */
container.register([
  {
    key: 'UserRepository',
    Class: UserRepositorySQLite,
  },
  {
    key: 'PasswordHash',
    Class: process.env.NODE_ENV === 'test' ? Base64PasswordHash : BcryptPasswordHash,
  },
  {
    key: 'ApplicationEvent',
    Class: ApplicationEventImpl,
  },
  {
    key: 'IdGenerator',
    Class: NanoIdGenerator,
  },
  {
    key: 'Tokenize',
    Class: JwtTokenize,
  },
  {
    key: 'StoryRepository',
    Class: StoryRepositorySQLite,
  },
  {
    key: 'StoryStorage',
    Class: LocalStoryStorage,
  },
]);

/** logging */
container.register([
  {
    key: 'Logger',
    Class: FileLogger,
  },
]);

/** use cases */
container.register([
  {
    Class: UserCreationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: LoginUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: StoryCreationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: GetAllStoriesUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: ScheduledDeleteStoryUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: ResetStoryUseCase,
    parameter: useCaseParameter,
  },
]);

export default container;
