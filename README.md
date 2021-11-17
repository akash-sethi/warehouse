# Warehouse Software

Data model considerations
---
The API is designed according to the files provided (inventory.json and products.json).

Tech stack
---
The project used the following technologies:
- Typescript
- Express
- GraphQL
- Nodejs
- MongoDB
- Docker

Security
---
There is no security implemented for this demo because of lack of time. In a production environment these APIs must have a security layer using JWT tokens or the OAuth2.
Moreover, best would be to implement API gateway on top of it.

API documentation
---
The API is implemented using GraphQL that provides documentation out of the box.

- Graphql: <ur>http://localhost:3000/graphql</url>
-  I would suggest use Altair GraphQL Client to run API, because it provides files upload options.

Run using docker
---
To run this application using docker:

- From root folder, run `cp .env.example .env` and set config for mongodb or use defaults
- Open Package.json file, and you will find a couple of scripts task to use: for instance
- RUN `yarn docker:dev` it will build and run the application in detached mode.
- To check logs of application run `yarn app-logs:dev`
- To create a fresh build run `yarn docker:dev-with-build`
- Once application is up and running use any graphql client(Altair GraphQL for instance) and navigate to <ur>http://localhost:3000/graphql</url> 
- you can use json file from sample-directory to test

When you run docker compose, these are the ports exposed to your computer:
- 3000 for Warehouse


Query sample
---
<br>- `query GET_ARTICLE($artId: String!){
  article(artId: $artId){
  art_id
  name
  stock
  }
  }`

<br>- `query GET_ARTICLES{
  articles{
  art_id
  name
  stock
  }
  }`

<br>- `query GET_PRODUCTS{
  products{
  _id
  name
  isAvailable
  contain_articles {
  article {
  art_id
  stock
  }
  isAvailable
  quantity
  }
  }
  }`

<br>- `query GET_PRODUCT($id: ID!){
  product(id: $id){
  _id
  name
  isAvailable
  contain_articles {
  article {
  art_id
  stock
  }
  isAvailable
  quantity
  }
  }
  }`

Mutation Sample
---

<br>- `mutation UPLOAD_ARTICLES($file: Upload!){
uploadArticles(file: $file)
}`

<br>- `mutation APPEND_ARTICLES($file: Upload!){
uploadArticles(file: $file)
}`

<br>- `mutation UPLOAD_PRODUCTS($file: Upload!){
saveProducts(file: $file)
}`

<br>- `mutation SELL($id: ID!){
sell(_id: $id){
_id
name
isAvailable
contain_articles {
quantity
}
}
}`

