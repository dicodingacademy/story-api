/* eslint-disable no-unused-vars */
import { CreatedUser } from '../entities';

export interface UserRepository {
  persist(createdUser: CreatedUser): Promise<void>;
  isEmailAlreadyInUse(email: string): Promise<boolean>;
}
