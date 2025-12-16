import { Request, Response, NextFunction } from 'express';
import { Certificate } from '../models/Certificate';
import { ApiError } from '../utils/ApiError';

export const listCertificates = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Certificate.find().sort({ order: 1, issueDate: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Certificate.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new ApiError(404, 'Certificate not found'));
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Certificate.findByIdAndDelete(req.params.id);
    if (!item) return next(new ApiError(404, 'Certificate not found'));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
