import faker from 'faker';

import { ArticleComposition } from '../../../src/models';
import mongoose from 'mongoose';

describe('ArticleComposition model', () => {
  describe('ArticleComposition validation', () => {
    let composition;
    beforeEach(() => {
      composition = {
        article: {
          _id: new mongoose.Types.ObjectId(),
          name: faker.name.findName(),
          art_id: faker.random.words(),
          stock: 12,
        },
        quantity: 4,
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should correctly validate a valid composition', async () => {
      await expect(new ArticleComposition(composition).validate()).resolves.toBeUndefined();
    });

    it('should throw a validation error if quantity is 0', async () => {
      composition.quantity = 0;
      await expect(new ArticleComposition(composition).validate()).rejects.toThrow();
    });

    it('should throw a validation error if article is undefined', async () => {
      composition.article = null;
      await expect(new ArticleComposition(composition).validate()).rejects.toThrow();
    });
  });
});
