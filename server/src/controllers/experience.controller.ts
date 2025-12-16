import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience';
import { ApiError } from '../utils/ApiError';

export const listExperience = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return next(new ApiError(404, 'Experience not found'));
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return next(new ApiError(404, 'Experience not found'));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
