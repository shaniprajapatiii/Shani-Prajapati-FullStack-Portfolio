import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.routes';
import skillRoutes from './skill.routes';
import projectRoutes from './project.routes';
import experienceRoutes from './experience.routes';
import certificateRoutes from './certificate.routes';
import mediaRoutes from './media.routes';
import messageRoutes from './message.routes';

const router = Router();

router.get('/health/live', (_req, res) => res.json({ status: 'ok' }));
router.get('/health/ready', (_req, res) => {
	const state = mongoose.connection.readyState;
	const healthy = state === 1; // connected
	if (!healthy) return res.status(503).json({ status: 'degraded', dbState: state });
	return res.json({ status: 'ok', dbState: state });
});

router.use('/auth', authRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/certificates', certificateRoutes);
router.use('/media', mediaRoutes);
router.use('/messages', messageRoutes);

export default router;
