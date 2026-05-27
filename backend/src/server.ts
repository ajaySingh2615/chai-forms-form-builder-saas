import { buildApp } from './app/index.js';

async function main() {
  // TODO: database connection

  const app = buildApp();

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error('Failed to start the server: ', error);
  process.exit(1);
});
