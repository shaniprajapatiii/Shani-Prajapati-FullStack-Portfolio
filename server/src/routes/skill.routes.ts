import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { validateResource } from '../middleware/validateResource';
import { upsertSkillSchema } from '../validators/skill.schema';
import { listSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skill.controller';

const router = Router();

router.get('/', listSkills);
router.post('/', authenticate, requireAdmin, validateResource(upsertSkillSchema), createSkill);
router.patch('/:id', authenticate, requireAdmin, validateResource(upsertSkillSchema), updateSkill);
router.delete('/:id', authenticate, requireAdmin, deleteSkill);

export default router;
