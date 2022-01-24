import { Server } from '@hapi/hapi';
import FormData from 'form-data';
import * as fs from 'fs';
import { resolve } from 'path';
import streamToPromise from 'stream-to-promise';
import { createServer } from '@Infrastructures/http';
import container from '@Infrastructures/container';
import StoriesTableTestHelper
  from '@Infrastructures/repositories/_test/helper/StoriesTableTestHelper';
import UsersTableTestHelper from '@Infrastructures/repositories/_test/helper/UsersTableTestHelper';
import ServerTestHelper from '@Infrastructures/http/_test/v1/helper/ServerTestHelper';

describe('stories', () => {
  let server: Server;
  let accessToken: string;

  beforeAll(async () => {
    server = await createServer(container);
  });

  beforeEach(async () => {
    await StoriesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();

    await ServerTestHelper.registerUser({});
    const { loginResult: { token } } = await ServerTestHelper.loginUser({});
    accessToken = token;
  });

  describe('when POST /v1/stories', () => {
    it('should response 401 when no auth', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/stories',
        payload: {},
      });

      expect(response.statusCode).toBe(401);
    });

    it('should response 401 when invalid payload', async () => {
      const formData = new FormData();
      formData.append('title', 'title');

      const payload = await streamToPromise(formData);

      const response = await server.inject({
        method: 'POST',
        url: '/v1/stories',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...formData.getHeaders(),
        },
        payload,
      });

      expect(response.statusCode).toBe(400);
    });

    it('should response 400 when photo not stream', async () => {
      const formData = new FormData();
      formData.append('description', 'description');
      formData.append('photo', 'photo');

      const payload = await streamToPromise(formData);

      const response = await server.inject({
        method: 'POST',
        url: '/v1/stories',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...formData.getHeaders(),
        },
        payload,
      });

      expect(response.statusCode).toBe(400);
    });

    it('should response 201 when success', async () => {
      const formData = new FormData();
      const file = fs.createReadStream(resolve(__dirname, './fixture/sample-image.png'));

      formData.append('description', 'lorem ipsum');
      formData.append('photo', file);

      const payload = await streamToPromise(formData);

      const response = await server.inject({
        method: 'POST',
        url: '/v1/stories',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...formData.getHeaders(),
        },
        payload,
      });
      expect(response.statusCode).toBe(201);
    });

    it('should response 401 when user not found', async () => {
      await UsersTableTestHelper.cleanTable();

      const formData = new FormData();
      const file = fs.createReadStream(resolve(__dirname, './fixture/sample-image.png'));

      formData.append('description', 'lorem ipsum');
      formData.append('photo', file);

      const payload = await streamToPromise(formData);

      const response = await server.inject({
        method: 'POST',
        url: '/v1/stories',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...formData.getHeaders(),
        },
        payload,
      });
      expect(response.statusCode).toBe(401);
    });
  });

  describe('when GET /v1/stories', () => {
    it('should response 401 when user not found', async () => {
      await UsersTableTestHelper.cleanTable();

      const response = await server.inject({
        method: 'GET',
        url: '/v1/stories',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.statusCode).toBe(401);
    });

    it('should response 200 and return all listStory', async () => {
      await UsersTableTestHelper.addUser({ email: 'dimas@dicoding.org' });
      await StoriesTableTestHelper.addStory({ id: 'story-123' });
      await StoriesTableTestHelper.addStory({ id: 'story-456' });

      const response = await server.inject({
        method: 'GET',
        url: '/v1/stories',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const payload = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(payload.listStory.length).toBe(2);
    });
  });

  describe('when POST /v1/stories/guest', () => {
    it('should response 401 when invalid payload', async () => {
      const formData = new FormData();
      formData.append('title', 'title');

      const payload = await streamToPromise(formData);

      const response = await server.inject({
        method: 'POST',
        url: '/v1/stories/guest',
        headers: {
          ...formData.getHeaders(),
        },
        payload,
      });

      expect(response.statusCode).toBe(400);
    });

    it('should response 201 success', async () => {

    });
  });
});
