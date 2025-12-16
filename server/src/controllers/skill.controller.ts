import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill';
import { ApiError } from '../utils/ApiError';

export const listSkills = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return next(new ApiError(404, 'Skill not found'));
    res.json(skill);
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return next(new ApiError(404, 'Skill not found'));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
