import { Router } from 'express';
import { login, refresh, logout, getMe } from '../controllers/auth.controller';
import { validateResource } from '../middleware/validateResource';
import { loginSchema } from '../validators/auth.schema';
import { authLimiter } from '../middleware/rateLimit';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', authLimiter, validateResource(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

export default router;
