import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtUser = {
  sub: string;
  email: string;
  role: 'admin';
};

export const signAccessToken = (payload: JwtUser) => {
  const options: SignOptions = { expiresIn: env.accessTokenExpires as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, env.jwtAccessSecret, options);
};

export const signRefreshToken = (payload: JwtUser) => {
  const options: SignOptions = { expiresIn: env.refreshTokenExpires as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, env.jwtRefreshSecret, options);
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.jwtAccessSecret) as JwtUser & jwt.JwtPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.jwtRefreshSecret) as JwtUser & jwt.JwtPayload;
