import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';
import { ApiError } from '../utils/ApiError';

export const listProjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return next(new ApiError(404, 'Project not found'));
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return next(new ApiError(404, 'Project not found'));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
