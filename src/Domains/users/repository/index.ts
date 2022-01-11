/* eslint-disable no-unused-vars */

import { CreatedUser } from '@Domains/users/entities';

export interface UserRepository {
  persist(createdUser: CreatedUser): Promise<void>;
  isEmailAlreadyInUse(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<CreatedUser | null>;
  findById(id: string): Promise<CreatedUser | null>;
}
