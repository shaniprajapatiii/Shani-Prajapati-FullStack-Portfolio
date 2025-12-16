import { Router } from 'express';
import authRoutes from './auth.routes';
import skillRoutes from './skill.routes';
import projectRoutes from './project.routes';
import experienceRoutes from './experience.routes';
import certificateRoutes from './certificate.routes';
import mediaRoutes from './media.routes';
import messageRoutes from './message.routes';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/certificates', certificateRoutes);
router.use('/media', mediaRoutes);
router.use('/messages', messageRoutes);

export default router;
