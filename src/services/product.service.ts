import { Article, ArticleComposition, Product } from '../models';
import { IArticleComposition, IProduct, ProductInput } from '../models/types';
import { articleMapper, formatProductResponse, parseData } from '../utils/helper';
import productValidation from '../validations/product.validation';
import ApiError from '../utils/apiError';
import httpStatus from 'http-status';
import { reduceStock } from './article.service';

export const getProducts = async () => {
  const products: IProduct[] = await Product.findAll();

  return products.map(formatProductResponse);
};

export const getProductById = async (_id: string) => formatProductResponse(await Product.findProductById(_id));

export const store = async (createReadStream): Promise<void> => {
  const products: ProductInput[] = await parseData(createReadStream(), productValidation.upload);
  for (const data of products) {
    const product = new Product({ name: data.name, contain_articles: [] });

    const compositions: IArticleComposition[] = await articleMapper(data.contain_articles);
    product.contain_articles.push(...compositions);

    await product.save();
  }
};

export const sell = async (_id: string) => {
  const product: IProduct = await Product.findProductById(_id);

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found!');
  }

  if (!isAvailable(product)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product is out of stock!');
  }

  product.contain_articles.forEach(await reduceStock);

  return Product.findProductById(_id);
};

function isAvailable(product: IProduct): boolean {
  return (
    product.contain_articles.length &&
    !product.contain_articles.some(
      (composition: IArticleComposition) => composition.article.stock < composition.quantity
    )
  );
}
