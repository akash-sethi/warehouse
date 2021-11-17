import { mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import articleSchema from './article';
import productSchema from './product';

const schema = makeExecutableSchema({
  typeDefs: [articleSchema.typeDefs, productSchema.typeDefs],
  resolvers: mergeResolvers([articleSchema.resolver, productSchema.resolver]),
});

export default schema;
