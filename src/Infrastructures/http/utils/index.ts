import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import ClientError from '@Commons/exceptions/ClientError';

export const secureResponse = (response: ResponseObject) => {
  response.header('Content-Security-Policy', 'upgrade-insecure-requests');
  response.header('referrer-policy', 'strict-origin-when-cross-origin');
  response.header('X-Frame-Options', 'DENY');
  response.header('X-Content-Type-Options', 'nosniff');
  response.header('X-XSS-Protection', '1; mode=block');
  return response;
};

export const preResponseMiddleware = (request: Request, h: ResponseToolkit) => {
  const { response } = request;

  if (response instanceof Error) {
    if (response instanceof ClientError) {
      const newResponse = h.response({
        error: true,
        message: response.message,
      });

      newResponse.code(response.statusCode);
      return secureResponse(newResponse);
    }

    if (!response.isServer) {
      const newResponse = h.response({
        status: 'fail',
        message: response.output.payload.message,
      });

      newResponse.code(response.output.statusCode);
      return secureResponse(newResponse);
    }

    const newResponse = h.response({
      status: 'error',
      message: 'terjadi kesalahan pada server kami',
    });
    newResponse.code(500);
    return secureResponse(newResponse);
  }

  return secureResponse(response);
};
