import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { validateResource } from '../middleware/validateResource';
import { upsertExperienceSchema } from '../validators/experience.schema';
import { listExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experience.controller';

const router = Router();

router.get('/', listExperience);
router.post('/', authenticate, requireAdmin, validateResource(upsertExperienceSchema), createExperience);
router.patch('/:id', authenticate, requireAdmin, validateResource(upsertExperienceSchema), updateExperience);
router.delete('/:id', authenticate, requireAdmin, deleteExperience);

export default router;
