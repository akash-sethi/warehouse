import { model, Schema } from 'mongoose';

import { ArticleModel, IArticle } from './types';

const articleSchema = new Schema<IArticle, ArticleModel>(
  {
    /**
     * Article global unique identification number
     */
    art_id: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * Article name
     */
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    /**
     * Article quantity
     */
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

articleSchema.statics.isExisting = async function (art_id: string) {
  const article = await this.findOne({ art_id });
  return !!article;
};

export const Article = model<IArticle, ArticleModel>('Article', articleSchema);
