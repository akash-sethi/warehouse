import { Model, model, Schema, SchemaTypes } from 'mongoose';

import { IArticleComposition } from './types';

const compositionSchema = new Schema<IArticleComposition>(
  {
    /**
     * Item. See {@link Article}.
     */
    article: {
      type: SchemaTypes.ObjectId,
      ref: 'Article',
      required: true,
    },
    /**
     * quantity of a particular article
     */
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

/**
 * @type {Model<ArticleComposition>}
 */
export const ArticleComposition = model<IArticleComposition>('ArticleComposition', compositionSchema);
