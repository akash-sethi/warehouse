import { bulkAppend, bulkSave, getArticleById, getArticles } from '../../services/article.service';

export const resolver = {
  Query: {
    articles: () => getArticles(),

    article: (_, { artId }) => getArticleById(artId),
  },

  Mutation: {
    uploadArticles: async (_, { file }) => {
      const { createReadStream } = await file.promise;
      await bulkSave(createReadStream);
    },

    appendArticles: async (_, { file }) => {
      const { createReadStream } = await file.promise;
      await bulkAppend(createReadStream);
    },
  },
};
