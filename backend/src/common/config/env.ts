import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
