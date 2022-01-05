import { nanoid } from 'nanoid';
import { IdGenerator } from '../../Domains/commons/utils';

class NanoIdGenerator implements IdGenerator {
  generate(): string {
    return nanoid(16);
  }
}

export default NanoIdGenerator;
