import gql from 'graphql-tag';

const typeDefs = gql`
  """
  Response type of an article
  """
  type ArticleType {
    art_id: String
    name: String
    stock: Int
  }

  """
  Upload file
  """
  scalar Upload

  type Query {
    """
    __get all articles__
    """
    articles: [ArticleType!]
    """
    __Get article by artId__

    ___Arguments:___
    * artId: unique article identifier
    """
    article(artId: String!): ArticleType
  }

  type Mutation {
    """
    __Upload articles using file.__

    ___Arguments:___
    * file: for instance inventory.json
    """
    uploadArticles(file: Upload!): Boolean
    """
    __Similar to uploadArticles but instead of replacing it appends stocks__

    ___Arguments:___
    * file: for instance inventory.json
    """
    appendArticles(file: Upload!): Boolean
  }

  input ArticleInput {
    art_id: String
    name: String
    stock: Int
  }
`;

export default typeDefs;
