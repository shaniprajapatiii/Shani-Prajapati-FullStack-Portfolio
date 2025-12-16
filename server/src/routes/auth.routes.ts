import { Router } from 'express';
import { login, refresh, logout } from '../controllers/auth.controller';
import { validateResource } from '../middleware/validateResource';
import { loginSchema } from '../validators/auth.schema';
import { authLimiter } from '../middleware/rateLimit';

const router = Router();

router.post('/login', authLimiter, validateResource(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
