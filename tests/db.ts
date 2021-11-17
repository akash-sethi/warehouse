import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

/**
 * Connect to mock memory db.
 */
export const connect = async () => {
  memoryServer = await MongoMemoryServer.create();

  const uri = memoryServer.getUri();

  await mongoose.connect(uri);
};

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await memoryServer.stop();
};

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
