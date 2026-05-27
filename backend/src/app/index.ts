import express, { type Application } from 'express';

export const buildApp = (): Application => {
  const app = express();

  return app;
};
