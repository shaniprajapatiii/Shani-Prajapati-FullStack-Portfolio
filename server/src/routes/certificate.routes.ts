import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { validateResource } from '../middleware/validateResource';
import { upsertCertificateSchema } from '../validators/certificate.schema';
import { listCertificates, createCertificate, updateCertificate, deleteCertificate } from '../controllers/certificate.controller';

const router = Router();

router.get('/', listCertificates);
router.post('/', authenticate, requireAdmin, validateResource(upsertCertificateSchema), createCertificate);
router.patch('/:id', authenticate, requireAdmin, validateResource(upsertCertificateSchema), updateCertificate);
router.delete('/:id', authenticate, requireAdmin, deleteCertificate);

export default router;
