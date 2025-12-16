import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useProjects } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import ProjectForm from '@/components/admin/ProjectForm';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  gradient: string;
  features?: string[];
  imageUrl?: string;
  technologies?: string[];
}

export const AdminProjects = () => {
  const { data: projects, loading: dataLoading, refetch } = useProjects() as { data: Project[] | null; loading: boolean; refetch: () => void };
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleAdd = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    const success = await remove(`/projects/${projectToDelete._id}`);
    if (success) {
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
      refetch();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const openDeleteConfirm = (project: Project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  if (dataLoading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/dashboard">← Dashboard</Link>
          </Button>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          + Add Project
        </Button>
      </div>

      {projects && projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map(project => (
            <Card
              key={project._id}
              className="hover:shadow-lg transition overflow-hidden"
            >
              <div
                className={`h-1 bg-gradient-to-r ${project.gradient}`}
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Description
                  </p>
                  <p className="text-sm">{project.description}</p>
                </div>

                {project.imageUrl && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Image URL
                    </p>
                    <p className="text-sm truncate font-mono">{project.imageUrl}</p>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Features
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="text-sm">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteConfirm(project)}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">No projects yet. Add your first project!</p>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            Add First Project
          </Button>
        </Card>
      )}

      {/* Project Form Dialog */}
      <ProjectForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={refetch}
        project={selectedProject}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProjects;
