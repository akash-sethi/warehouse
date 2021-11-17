import { GraphQLError } from 'graphql';

class ApiError extends GraphQLError {
  constructor(readonly statusCode: number, readonly message: string, readonly isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
