import { ResponseObject } from '@hapi/hapi';

const secureResponse = (response: ResponseObject) => {
  response.header('Content-Security-Policy', 'upgrade-insecure-requests');
  response.header('referrer-policy', 'strict-origin-when-cross-origin');
  response.header('X-Frame-Options', 'DENY');
  response.header('X-Content-Type-Options', 'nosniff');
  response.header('X-XSS-Protection', '1; mode=block');
  return response;
};

export default secureResponse;
