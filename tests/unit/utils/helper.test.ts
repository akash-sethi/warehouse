import { chain } from 'stream-chain';
import { articleMapper, formatProductResponse, parseData } from '../../../src/utils/helper';
import { ReadStream } from 'fs';
import { Article, ArticleComposition } from '../../../src/models';
import * as mockMongoose from 'mockingoose';
import { CompositionType, IArticleComposition, IProduct } from '../../../src/models/types';

jest.mock('stream-chain');

describe('Helper', () => {
  describe('articleMapper', () => {
    let article, composition;
    beforeEach(() => {
      article = {
        name: 'screw',
        art_id: '1',
        stock: 12,
      };
      mockMongoose(Article).toReturn(article, 'findOne');

      composition = {
        article: article,
        quantity: 4,
      };
      mockMongoose(ArticleComposition).toReturn(composition, 'save');
    });

    it('should map article', async () => {
      const data = [{ art_id: '1', amount_of: 4 } as CompositionType];
      const result: IArticleComposition[] = await articleMapper(data);
      expect(result.pop().quantity).toBe(4);
    });
  });

  describe('parser', () => {
    beforeEach(() => {
      (chain as jest.Mock).mockImplementation((params) => {
        return {
          on: jest.fn().mockImplementationOnce((event, handler) => {
            handler(Promise.resolve('data'));
          }),
        };
      });
    });

    it('should parse data', async () => {
      const dummy = {};
      parseData(dummy as ReadStream, dummy).then((r) => {
        expect(chain).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('formatProductResponse', () => {
    let compositions;

    beforeEach(() => {
      compositions = [
        {
          article: { name: 'screw', art_id: '1', stock: 12 },
          quantity: 4,
        },
        {
          article: { name: 'legs', art_id: '2', stock: 12 },
          quantity: 4,
        },
      ];
    });

    it('should set availability of product', () => {
      const product: any = { name: 'some product', contain_articles: [...compositions] };
      expect(formatProductResponse(product).isAvailable).toBe(true);

      compositions[0].quantity = 15;
      expect(formatProductResponse(product).isAvailable).toBe(false);
    });
  });
});
