/* eslint-disable no-unused-vars */

export interface PasswordHash {
  hash(password: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
