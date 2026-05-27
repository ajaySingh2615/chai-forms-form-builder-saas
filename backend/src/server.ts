import { buildApp } from './app/index.js';
import { env } from './common/config/env.js';

async function main() {
  // TODO: database connection

  const app = buildApp();

  app.listen(env.PORT, () => {
    console.log(`server is running on port ${env.PORT}`);
  });
}

main().catch((error) => {
  console.error('Failed to start the server: ', error);
  process.exit(1);
});
