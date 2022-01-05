/* eslint-disable no-use-before-define,no-unused-vars */
import { UserRepository } from '../../../Domains/users/repository';
import { IdGenerator } from '../../../Domains/commons/utils';
import { PasswordHash } from '../../../Domains/users/security';

export abstract class ApplicationUseCase<Input, Output> {
  protected applicationEvent: ApplicationEvent;

  protected constructor({ applicationEvent } : UseCaseDependencies) {
    this.applicationEvent = applicationEvent;
  }

  protected abstract run(payload: Input): Promise<Output>;

  async execute(payload: Input): Promise<Output> {
    const output = await this.run(payload);
    await this.applicationEvent.raise(this, {
      input: payload,
      output,
    });

    return output;
  }
}

export interface ApplicationEvent {
  raise(useCase: ApplicationUseCase<any, any>, data?: any): Promise<void>;
  subscribe(useCase: ApplicationUseCase<any, any>, callback: (data?: any) => void): void;
}

export type UseCaseDependencies = {
  userRepository?: UserRepository,
  idGenerator?: IdGenerator,
  passwordHash?: PasswordHash,
  applicationEvent?: ApplicationEvent
}
