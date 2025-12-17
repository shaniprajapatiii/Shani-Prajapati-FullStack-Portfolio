import rateLimit from 'express-rate-limit';

const createLimiter = (windowMs: number, max: number) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
  });

// Login throttling
export const authLimiter = createLimiter(15 * 60 * 1000, 20);

// Public contact form / messages
export const messageLimiter = createLimiter(10 * 60 * 1000, 30);
