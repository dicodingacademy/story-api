import { createServer } from '../../../index';
import container from '../../../../container';

const ServerTestHelper = {
  async registerUser({ email = 'dimas@dicoding.com', password = '123456', name = 'Dimas' }: any = {}) {
    const server = await createServer(container);

    await server.inject({
      method: 'POST',
      url: '/v1/register',
      payload: {
        email,
        password,
        name,
      },
    });
  },
};

export default ServerTestHelper;
