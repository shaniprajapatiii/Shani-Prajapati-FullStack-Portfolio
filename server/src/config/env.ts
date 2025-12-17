import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const required = (value: string | undefined, name: string) => {
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
};

const corsList = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: required(process.env.MONGODB_URI, 'MONGODB_URI'),
  jwtAccessSecret: required(process.env.JWT_ACCESS_SECRET, 'JWT_ACCESS_SECRET'),
  jwtRefreshSecret: required(process.env.JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET'),
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d',
  corsOrigins: corsList,
  cloudinary: {
    cloudName: required(process.env.CLOUDINARY_CLOUD_NAME, 'CLOUDINARY_CLOUD_NAME'),
    apiKey: required(process.env.CLOUDINARY_API_KEY, 'CLOUDINARY_API_KEY'),
    apiSecret: required(process.env.CLOUDINARY_API_SECRET, 'CLOUDINARY_API_SECRET'),
  },
  adminSeed: {
    email: required(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL'),
    password: required(process.env.ADMIN_PASSWORD, 'ADMIN_PASSWORD'),
  },
  smtp: {
    host: required(process.env.SMTP_HOST, 'SMTP_HOST'),
    port: Number(process.env.SMTP_PORT || 587),
    user: required(process.env.SMTP_USER, 'SMTP_USER'),
    pass: required(process.env.SMTP_PASS || process.env.SMTP_PASSWORD, 'SMTP_PASS'),
  },
  ownerEmail: required(process.env.OWNER_EMAIL, 'OWNER_EMAIL'),
};

export const isProd = env.nodeEnv === 'production';
