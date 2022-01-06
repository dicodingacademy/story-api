/* istanbul ignore file */
import { createContainer, ParameterOption } from 'instances-container';
import UserRepositorySQLite from './repositories/UserRepositorySQLite';
import Base64PasswordHash from './security/Base64PasswordHash';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import ApplicationEventImpl from './event/ApplicationEventImpl';
import NanoIdGenerator from './utils/NanoIdGenerator';
import UserCreationUseCase from '../Applications/usecase/users/UserCreationUseCase';
import JwtTokenize from './tokenize/JwtTokenize';
import LoginUseCase from '../Applications/usecase/authentications/LoginUseCase';
import LocalStoryStorage from './storage/LocalStoryStorage';
import StoryCreationUseCase from '../Applications/usecase/stories/StoryCreationUseCase';

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
    Class: UserRepositorySQLite,
  },
  {
    key: 'StoryStorage',
    Class: LocalStoryStorage,
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
]);

export default container;
