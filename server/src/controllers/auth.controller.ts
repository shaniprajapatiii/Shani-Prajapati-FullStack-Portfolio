import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens';
import { ApiError } from '../utils/ApiError';
import { env, isProd } from '../config/env';

const cookieOptions = (maxAgeMs: number) => ({
  httpOnly: true,
  sameSite: isProd ? ('none' as const) : ('lax' as const),
  secure: isProd,
  maxAge: maxAgeMs,
});

const ACCESS_MAX_AGE = 15 * 60 * 1000; // 15m
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7d

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return next(new ApiError(401, 'Invalid credentials'));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError(401, 'Invalid credentials'));

    const payload = { sub: String(user._id), email: user.email, role: 'admin' as const };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    if (process.env.NODE_ENV !== 'production') {
      console.log('[LOGIN] User authenticated', { email: user.email, role: 'admin', hasAccessToken: !!accessToken });
    }

    res
      .cookie('accessToken', accessToken, { ...cookieOptions(ACCESS_MAX_AGE) })
      .cookie('refreshToken', refreshToken, { ...cookieOptions(REFRESH_MAX_AGE) })
      .status(200)
      .json({ user: { email: user.email, role: 'admin' } });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.refreshToken as string | undefined;
    if (!token) return next(new ApiError(401, 'Unauthorized'));

    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.sub);
    if (!user) return next(new ApiError(401, 'Unauthorized'));

    const accessToken = signAccessToken({ sub: String(user._id), email: user.email, role: 'admin' });
    const refreshToken = signRefreshToken({ sub: String(user._id), email: user.email, role: 'admin' });

    res
      .cookie('accessToken', accessToken, { ...cookieOptions(ACCESS_MAX_AGE) })
      .cookie('refreshToken', refreshToken, { ...cookieOptions(REFRESH_MAX_AGE) })
      .status(200)
      .json({ user: { email: user.email, role: user.role } });
  } catch (err) {
    next(new ApiError(401, 'Unauthorized'));
  }
};

export const logout = (_req: Request, res: Response) => {
  res
  .clearCookie('accessToken', { httpOnly: true, sameSite: isProd ? 'none' : 'lax', secure: isProd })
  .clearCookie('refreshToken', { httpOnly: true, sameSite: isProd ? 'none' : 'lax', secure: isProd })
    .status(200)
    .json({ message: 'Logged out' });
};

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return next(new ApiError(401, 'User not found'));

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
