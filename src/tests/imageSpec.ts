import app from '../index';
import supertest from 'supertest';
import { imageResize } from '../utils/utils';

const request = supertest(app);

const fileName = 'doggo';
const width = 200;
const height = 100;

describe('Image Processing API Test Suite', () => {
  it('Perform GET / without query parameters', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('Perform image resize successfully', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      `/api?fileName=${fileName}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });

  it('Perform GET / with missing query parameter', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      `/api?fileName=${fileName}&width=${width}`
    );
    expect(response.status).toBe(400);
  });
});

describe('Image Resize Function', async (): Promise<void> => {
  const fullPath = './assets/full';
  const thumbPath = './assets/thumb';
  it('Trying out existing image file to check funcitonality', async (): Promise<void> => {
    const success = await imageResize(
      `${fullPath}/${fileName}.jpg`,
      width,
      height,
      `${thumbPath}/${fileName}_${width}_${height}.jpg`
    );
    expect(success).toBe(true);
  }),
    it('Trying out passing erroneous parameters to make sure function catches erros.', async (): Promise<void> => {
      const success = await imageResize(
        `${fullPath}/potato.jpg`,
        width,
        height,
        `${thumbPath}/potato_${width}_${height}.jpg`
      );
      expect(success).toBe(false);
    });
});
