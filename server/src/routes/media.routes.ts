import { Router } from 'express';
import multer from 'multer';
import { authenticate, requireAdmin } from '../middleware/auth';
import { uploadMedia } from '../controllers/media.controller';
import { ApiError } from '../utils/ApiError';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new ApiError(400, 'Only image uploads are allowed'));
    }
    cb(null, true);
  },
});

router.post('/upload', authenticate, requireAdmin, upload.single('file'), uploadMedia);

export default router;
