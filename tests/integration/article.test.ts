import request from 'supertest';
import { app } from '../../src/app';
import { connect, closeDatabase } from '../db';
import { insertArticles, mockArticles } from '../fixture';

describe('Articles', () => {
  describe('Query', () => {
    beforeAll(() => {
      connect();
    });

    afterAll(() => {
      closeDatabase();
    });

    it('fetch articles before saving', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({
          query: '{ articles{ art_id, name, stock} }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.data).toEqual({ articles: [] });
    });

    it('fetch articles after saving', async () => {
      await insertArticles();
      const res = await request(app)
        .post('/graphql')
        .send({
          query: '{ articles{ art_id, name, stock} }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.data.articles).toEqual(mockArticles);
    });
  });
});
