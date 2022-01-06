/* eslint-disable no-unused-vars */
import { TokenPayload } from '../entities';

export interface Tokenize {
  createAccessToken(tokenPayload: TokenPayload): Promise<string>;
}
