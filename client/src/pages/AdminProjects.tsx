import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useProjects } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import GridBackground from '@/components/GridBackground';
import { motion } from 'framer-motion';
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

const AdminProjects = () => {
  const { data: projects, loading: dataLoading, refetch } = useProjects() as { data: Project[] | null; loading: boolean; refetch: () => void };
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

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
      <GridBackground>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center text-muted-foreground">Loading projects...</div>
        </div>
      </GridBackground>
    );
  }

  return (
    <GridBackground>
      <div className="min-h-screen p-6 pt-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="font-display text-3xl font-bold text-foreground">Manage Projects</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <span className="text-sm text-muted-foreground truncate max-w-[220px] sm:max-w-none">
                {user?.email}
              </span>
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="gap-2 w-full sm:w-auto justify-center"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="space-y-6">
          {/* Add Project Button */}
          <div className="flex justify-end">
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>

          {/* Projects List */}
          {projects && projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map(project => (
                <Card
                  key={project._id}
                  className="bg-card/50 border-primary/20 hover:border-primary/40 transition overflow-hidden"
                >
                  <div
                    className={`h-1 bg-gradient-to-r ${project.gradient}`}
                  />
                  <CardHeader>
                    <CardTitle className="text-foreground">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Description
                      </p>
                      <p className="text-sm text-foreground">{project.description}</p>
                    </div>

                    {project.imageUrl && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Image URL
                        </p>
                        <p className="text-sm truncate font-mono text-foreground">{project.imageUrl}</p>
                      </div>
                    )}

                    {project.features && project.features.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Features
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-foreground">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs text-foreground"
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
                        className="flex-1 gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteConfirm(project)}
                        className="flex-1 gap-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 border-primary/20 p-8 text-center">
              <p className="text-muted-foreground mb-4">No projects yet. Add your first project!</p>
              <Button onClick={handleAdd} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Project
              </Button>
            </Card>
          )}
        </div>
      </motion.div>

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
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </GridBackground>
  );
};

export default AdminProjects;
