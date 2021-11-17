import request from 'supertest';
import { app } from '../../src/app';
import { connect, closeDatabase, clearDatabase } from '../db';
import { insertArticles, insertProducts, mockArticles } from '../fixture';

describe('Products', () => {
  describe('Query', () => {
    beforeAll(() => {
      connect();
    });

    afterAll(async () => {
      await closeDatabase();
    });

    it('fetch products before saving', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({
          query: '{ products{ name} }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.data).toEqual({ products: [] });
    });

    it('fetch products after saving', async () => {
      await insertProducts();
      const res = await request(app)
        .post('/graphql')
        .send({
          query: '{ products{ name} }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.data.products).toEqual([{ name: 'some product' }]);
    });
  });
});
