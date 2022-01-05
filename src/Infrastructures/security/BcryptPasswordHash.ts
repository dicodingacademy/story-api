/* istanbul ignore file */

import { hash, compare } from 'bcrypt';
import { PasswordHash } from '../../Domains/users/security';

class BcryptPasswordHash implements PasswordHash {
  async hash(password: string): Promise<string> {
    return hash(password, 16);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}

export default BcryptPasswordHash;
