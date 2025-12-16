import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { validateResource } from '../middleware/validateResource';
import { upsertProjectSchema } from '../validators/project.schema';
import { listProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller';

const router = Router();

router.get('/', listProjects);
router.post('/', authenticate, requireAdmin, validateResource(upsertProjectSchema), createProject);
router.patch('/:id', authenticate, requireAdmin, validateResource(upsertProjectSchema), updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);

export default router;
