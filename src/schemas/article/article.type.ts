import gql from 'graphql-tag';

const typeDefs = gql`
  type ArticleType {
    art_id: String
    name: String
    stock: Int
  }

  scalar Upload

  type Query {
    articles: [ArticleType!]
    article(artId: String!): ArticleType
  }

  type Mutation {
    bulkSave(file: Upload!): Boolean
    bulkAppend(file: Upload!): Boolean
  }

  input ArticleInput {
    art_id: String
    name: String
    stock: Int
  }
`;

export default typeDefs;
