import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../config/cloudinary';
import { ApiError } from '../utils/ApiError';
import { randomUUID } from 'crypto';

const uploadBuffer = (buffer: Buffer, filename: string): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'kinetic-drop-site',
        public_id: filename,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

export const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) return next(new ApiError(400, 'File is required'));

    const uniqueName = `${Date.now()}-${randomUUID()}`;
    const uploaded = await uploadBuffer(file.buffer, uniqueName);

    res.status(201).json({ url: uploaded.url, key: uploaded.public_id });
  } catch (err) {
    next(err);
  }
};
