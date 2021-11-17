import { Model } from 'mongoose';

export interface IArticle {
  art_id: string;
  name: string;
  stock: number;
}

export interface ArticleModel extends Model<IArticle> {
  isExisting(art_id: string): Promise<boolean>;
}

export interface IProduct {
  name: string;
  contain_articles: IArticleComposition[];
  isAvailable?: boolean;

  save(): IProduct;

  markModified(anything: string): void;
}

export interface ProductModel extends Model<IProduct> {
  findProductById(_id: string): Promise<IProduct>;
  findAll(): Promise<IProduct[]>;
}

export interface IArticleComposition {
  _id?: string;
  article: IArticle;
  quantity: number;
  isAvailable?: boolean;
  save(): IArticleComposition;
}

export interface ProductInput {
  name: string;
  contain_articles: CompositionType[];
}

export interface CompositionType {
  art_id: string;
  amount_of: number;
}
