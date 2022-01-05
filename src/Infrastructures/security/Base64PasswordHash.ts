import { PasswordHash } from '../../Domains/users/security';

// this is for test only
class Base64PasswordHash implements PasswordHash {
  async compare(plain: string, hashed: string): Promise<boolean> {
    const decoded = Buffer.from(hashed, 'base64').toString('utf8');
    return Promise.resolve(plain === decoded);
  }

  async hash(password: string): Promise<string> {
    return Buffer.from(password).toString('base64');
  }
}

export default Base64PasswordHash;
