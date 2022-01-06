/* istanbul ignore file */
import { createContainer, ParameterOption } from 'instances-container';
import UserRepositorySQLite from './repositories/UserRepositorySQLite';
import Base64PasswordHash from './security/Base64PasswordHash';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import ApplicationEventImpl from './event/ApplicationEventImpl';
import NanoIdGenerator from './utils/NanoIdGenerator';
import UserCreationUseCase from '../Applications/usecase/users/UserCreationUseCase';

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
]);

/** use cases */
container.register([
  {
    Class: UserCreationUseCase,
    parameter: useCaseParameter,
  },
]);

export default container;
