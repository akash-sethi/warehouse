import { Model, model, Schema, SchemaTypes, Types } from 'mongoose';

import { ArticleModel, IProduct, ProductModel } from './types';
import { ArticleComposition } from './article.composition.model';
import { Article } from './article.model';

const productSchema = new Schema<IProduct, ProductModel>(
  {
    /**
     * Product name
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * List of article composition
     */
    contain_articles: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: 'ArticleComposition',
          required: true,
        },
      ],
      min: 1,
    },
  },
  { timestamps: true }
);

productSchema.statics.findProductById = async function (_id: string): Promise<IProduct> {
  return await this.findById(_id)
    .populate({
      path: 'contain_articles',
      model: ArticleComposition,
      populate: {
        path: 'article',
        model: Article,
      },
    })
    .exec();
};

productSchema.statics.findAll = async function (): Promise<IProduct[]> {
  return await this.find()
    .populate({
      path: 'contain_articles',
      model: ArticleComposition,
      select: '-_id -createdAt -updatedAt -__v',
      populate: {
        path: 'article',
        model: Article,
        select: '-createdAt -updatedAt -__v',
      },
    })
    .exec();
};

/**
 * @type {Model<Product>}
 */
export const Product = model<IProduct, ProductModel>('Product', productSchema);
