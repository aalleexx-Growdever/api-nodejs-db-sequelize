import request from 'supertest';
import app from '../../src/app';

describe('category', () => {
  describe('create', () => {
    it('should create a new category', async () => {
      expect.assertions(2);

      const response = await request(app).post('/categories').send({
        name: 'testCategory',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });
});
