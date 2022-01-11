import { Server } from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import config from '@Commons/config';

export const configureJwtAuth = async (server: Server) => {
  // stories jwt auth
  await server.register({
    plugin: Jwt.plugin,
  });

  server.auth.strategy('story_jwt', 'jwt', {
    keys: config.tokenize.secret,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.tokenize.age,
    },
    validate: (artifacts: any) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
      },
    }),
  });
};
