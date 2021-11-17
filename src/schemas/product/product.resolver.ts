import { getProductById, getProducts, store, sell } from '../../services/product.service';

export const resolver = {
  Query: {
    products: (_) => getProducts(),

    product: (_, { id }) => getProductById(id),
  },

  Mutation: {
    saveProducts: async (_, { file }) => {
      const { createReadStream } = await file.promise;
      await store(createReadStream);
    },

    sell: async (_, { _id }) => {
      return await sell(_id);
    },
  },
};
