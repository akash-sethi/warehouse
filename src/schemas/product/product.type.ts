import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Void

  type ArticleComposition {
    article: ArticleType
    quantity: Int
    isAvailable: Boolean
  }

  type ProductType {
    _id: ID!
    name: String!
    isAvailable: Boolean
    contain_articles: [ArticleComposition!]
  }

  extend type Query {
    products: [ProductType!]
    product(id: ID!): ProductType
  }

  extend type Mutation {
    saveProducts(file: Upload!): Boolean
    sell(_id: ID!): ProductType!
  }

  input ProductInput {
    art_id: String
    name: String
    stock: Int
  }
`;

export default typeDefs;
