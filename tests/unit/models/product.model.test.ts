import faker from 'faker';

import { Article, ArticleComposition, Product } from '../../../src/models';

describe('Product model', () => {
  describe('Article validation', () => {
    let newProduct;
    beforeEach(() => {
      const newArticle = {
        name: faker.name.findName(),
        art_id: faker.random.words(),
        stock: 12,
      };
      let newArticleComposition = {
        article: newArticle,
        quantity: 3,
      };
      newProduct = {
        name: faker.name.findName(),
        contain_articles: [new ArticleComposition(newArticleComposition)],
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should correctly validate a valid article', async () => {
      await expect(new Product(newProduct).validate()).resolves.toBeUndefined();
    });

    it('should throw a validation error if name is empty', async () => {
      newProduct.name = [];
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    it('should throw a validation error if contain_articles is empty', async () => {
      newProduct.contain_articles = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });
  });
});
