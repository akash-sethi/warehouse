import { Article } from '../models';
import { IArticle, IArticleComposition } from '../models/types';
import { parseData } from '../utils/helper';
import articleValidation from '../validations/article.validation';

export const getArticles = async () => Article.find();

export const getArticleById = async (art_id: string) => Article.findOne({ art_id });

export const bulkSave = async (createReadStream: any): Promise<void> => {
  const articles: IArticle[] = await parseData(createReadStream(), articleValidation.upload);

  for (const article of articles) {
    await Article.findOneAndUpdate({ art_id: article.art_id }, article, { upsert: true });
  }
};

export const bulkAppend = async (createReadStream: any): Promise<void> => {
  const articles: IArticle[] = await parseData(createReadStream(), articleValidation.upload);

  for (const article of articles) {
    if (await Article.isExisting(article.art_id)) {
      const current = await Article.findOne({ art_id: article.art_id });
      await Article.updateOne({ art_id: article.art_id }, { stock: current.stock + article.stock });
      current.stock += article.stock;
      await current.save();
    } else {
      await Article.create({ ...article });
    }
  }
};

export const reduceStock = async ({ article, quantity }): Promise<IArticle> => {
  const finalStock = article.stock - quantity;
  return Article.findOneAndUpdate({ art_id: article.art_id }, { $set: { stock: finalStock } });
};
