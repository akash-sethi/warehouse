import mongoose from 'mongoose';

import { Article, ArticleComposition, Product } from '../src/models';

export const mockArticles = [
  {
    name: 'leg',
    art_id: '1',
    stock: 6,
  },
  {
    name: 'screw',
    art_id: '2',
    stock: 8,
  },
];

export const mockProducts = [
  {
    name: 'leg',
    art_id: '1',
    stock: 6,
  },
  {
    name: 'screw',
    art_id: '2',
    stock: 8,
  },
];

export const insertArticles = async (articles = mockArticles) => {
  await Article.insertMany(articles.map((article) => ({ ...article })));
};

export const insertProducts = async () => {
  const article = await insertArticles([mockArticles[0]]);
  const composition = new ArticleComposition({ article: article, quantity: 4 });
  await Product.create({ name: 'some product', contain_articles: [composition] });
};
