import express, { type Application } from 'express';
import { healthRoutes } from '../modules/health/health.routes.js';

export const buildApp = (): Application => {
  const app = express();

  app.use(express.json());

  app.use('/api/v1/health', healthRoutes);

  return app;
};
