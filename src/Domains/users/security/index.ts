/* eslint-disable no-unused-vars */

export interface PasswordHash {
  hash(password: string): Promise<string>;
}
