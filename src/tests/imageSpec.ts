import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Image Processing API Test Suite', () => {
  const fileName = 'doggo';
  const width = 200;
  const height = 100;

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
