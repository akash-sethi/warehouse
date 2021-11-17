import faker from 'faker';

import { Article } from '../../../src/models';

describe('Article model', () => {
  describe('Article validation', () => {
    let newArticle;
    beforeEach(() => {
      newArticle = {
        name: faker.name.findName(),
        art_id: faker.random.words(),
        stock: 12,
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should correctly validate a valid article', async () => {
      await expect(new Article(newArticle).validate()).resolves.toBeUndefined();
    });

    it('should throw a validation error if name is empty', async () => {
      newArticle.name = '';
      await expect(new Article(newArticle).validate()).rejects.toThrow();
    });

    it('should throw a validation error if art_id is empty', async () => {
      newArticle.art_id = '';
      await expect(new Article(newArticle).validate()).rejects.toThrow();
    });

    it('should throw a validation error if stock is empty or negative', async () => {
      newArticle.stock = undefined;
      await expect(new Article(newArticle).validate()).rejects.toThrow();
      newArticle.stock = -1;
      await expect(new Article(newArticle).validate()).rejects.toThrow();
    });
  });
});
