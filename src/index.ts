import mongoose from 'mongoose';

import { app } from './app';
import { config } from './config/config';

let server = null;

async function main() {
  try {
    await mongoose.connect(config.mongoose.url);
    server = app.listen(config.port, () => console.log(`http://localhost:${config.port}`));
  } catch (err) {
    console.error(`Error occurred while application boot process: ${err}`);
    setTimeout(main, 10000);
  }
}

main().then(() => console.info(`Awesome!!`));

const unexpectedErrorHandler = (error) => {
  console.log(`Error:: ${error}`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// process.on('SIGTERM', () => {
//     console.info('SIGTERM received');
//     if(server) {
//         server.close();
//     }
// });
