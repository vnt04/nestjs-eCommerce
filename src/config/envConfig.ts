import * as dotenv from 'dotenv';

dotenv.config();

export const envConfiguration = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
});
