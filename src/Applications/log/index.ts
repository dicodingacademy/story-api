/* eslint-disable no-unused-vars */

export type Event = {
  type: string;
  payload: any;
}

export interface Logger {
  writeError(error: Error): void;
  writeClientError(error: Error): void;
  writeEvent(event: Event): void;
}
