import { ReadStream } from 'fs';
import { chain } from 'stream-chain';
import StreamValues from 'stream-json/streamers/StreamValues';

import { Article, ArticleComposition } from '../models';
import { CompositionType, IArticleComposition, IProduct } from '../models/types';
import { validate } from './validate';

export const parseData = async (stream: ReadStream, schema): Promise<any> => {
  const pipeline = chain([stream, StreamValues.withParser(), (data) => validate(data, schema)]);

  return new Promise(function (resolve, reject) {
    pipeline.on('data', (data) => resolve(data.value as any));
    pipeline.on('error', (error) => reject(error));
  });
};

export const articleMapper = async (compositions: CompositionType[]): Promise<IArticleComposition[]> => {
  const articleComposition: IArticleComposition[] = [];
  for (const composition of compositions) {
    const article = await Article.findOne({ art_id: composition.art_id });
    articleComposition.push(await new ArticleComposition({ article: article, quantity: composition.amount_of }).save());
  }
  return articleComposition;
};

export const formatProductResponse = (product: IProduct) => {
  if (!product) {
    return null;
  }

  product.isAvailable =
    product.contain_articles.length &&
    !product.contain_articles.some(
      (composition: IArticleComposition) => composition.article.stock < composition.quantity
    );

  product.contain_articles.forEach(
    (composition) => (composition.isAvailable = composition.article.stock >= composition.quantity)
  );

  return product;
};
