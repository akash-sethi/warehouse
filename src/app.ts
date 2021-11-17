import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import httpStatus from 'http-status';

import schema from './schemas';

export const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/graphql', graphqlUploadExpress({ maxFileSize: 1000, maxFiles: 1 }), (req, res) => {
  graphqlHTTP({
    schema,
    graphiql: true,
    context: { req },
    customFormatErrorFn: (error: any) => {
      const statusCode = error.originalError ? error.originalError.statusCode : httpStatus.INTERNAL_SERVER_ERROR;
      return { message: error.message, statusCode };
    },
  })(req, res);
});

app.get('/', (req, res) => res.send({ status: 'success!!' }));
