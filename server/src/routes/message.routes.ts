import { Router } from 'express';
import { validateResource } from '../middleware/validateResource';
import { authenticate, requireAdmin } from '../middleware/auth';
import { createMessageSchema } from '../validators/message.schema';
import { messageLimiter } from '../middleware/rateLimit';
import {
  createMessage,
  getMessages,
  deleteMessage,
} from '../controllers/message.controller';

const router = Router();

// Public route to create a message (rate limited)
router.post('/', messageLimiter, validateResource(createMessageSchema), createMessage);

// Protected routes - for admin to view and manage messages
router.get('/', authenticate, requireAdmin, getMessages);
router.delete('/:id', authenticate, requireAdmin, deleteMessage);

export default router;
