import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Void

  """
  product contain_articles type
  """
  type ArticleComposition {
    article: ArticleType
    quantity: Int
    isAvailable: Boolean
  }

  """
  Response type of a product
  """
  type ProductType {
    _id: ID!
    name: String!
    isAvailable: Boolean
    contain_articles: [ArticleComposition!]
  }

  extend type Query {
    """
    __get all products
    """
    products: [ProductType!]

    """
    __get product by objectId__
    """
    product(id: ID!): ProductType
  }

  extend type Mutation {
    """
    __Upload products using file.__

    ___Arguments:___
    * file: for instance products.json
    """
    saveProducts(file: Upload!): Boolean

    """
    __Sell product and update inventory.__

    ___Arguments:___
    * _id: ObjectID
    """
    sell(_id: ID!): ProductType!
  }

  input ProductInput {
    art_id: String
    name: String
    stock: Int
  }
`;

export default typeDefs;
