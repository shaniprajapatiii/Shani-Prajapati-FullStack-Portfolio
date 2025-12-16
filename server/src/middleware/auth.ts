import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/tokens';
import { ApiError } from '../utils/ApiError';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  // Prefer cookie token, but also support Authorization: Bearer <token>
  let token = req.cookies?.accessToken as string | undefined;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring('Bearer '.length);
    }
  }
  if (!token) return next(new ApiError(401, 'Unauthorized'));

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    // Debug: Log authenticated user and origin to diagnose admin denial
    if (process.env.NODE_ENV !== 'production') {
      console.log('[AUTH] Authenticated', {
        origin: req.headers.origin,
        path: req.path,
        user: { sub: payload.sub, email: payload.email, role: payload.role },
      });
    }
    return next();
  } catch (err) {
    return next(new ApiError(401, 'Unauthorized'));
  }
};

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[AUTH] Admin check failed', {
        origin: req.headers.origin,
        path: req.path,
        user: req.user,
      });
    }
    return next(new ApiError(403, 'Forbidden'));
  }
  return next();
};
