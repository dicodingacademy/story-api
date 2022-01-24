/* eslint-disable no-unused-vars */

export type Event = {
  type: string;
  payload: any;
}

export interface Logger {
  writeError(error: Error): Promise<void>;
  writeClientError(error: Error): Promise<void>;
  writeEvent(event: Event): Promise<void>;
}
