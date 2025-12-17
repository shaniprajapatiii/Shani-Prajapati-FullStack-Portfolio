import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useExperience } from '@/hooks/useApi';
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
import { formatDateRange } from '@/lib/formatters';
import ExperienceForm from '@/components/admin/ExperienceForm';

interface Experience {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
  responsibilities?: string[];
}

const AdminExperience = () => {
  const { data: experiences, loading: dataLoading, refetch } = useExperience();
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [expToDelete, setExpToDelete] = useState<Experience | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const handleAdd = () => {
    setSelectedExp(null);
    setFormOpen(true);
  };

  const handleEdit = (exp: Experience) => {
    setSelectedExp(exp);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!expToDelete) return;

    const success = await remove(`/experience/${expToDelete._id}`);
    if (success) {
      toast({
        title: 'Success',
        description: 'Experience deleted successfully',
      });
      setDeleteConfirmOpen(false);
      setExpToDelete(null);
      refetch();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete experience',
        variant: 'destructive',
      });
    }
  };

  const openDeleteConfirm = (exp: Experience) => {
    setExpToDelete(exp);
    setDeleteConfirmOpen(true);
  };

  if (dataLoading) {
    return (
      <GridBackground>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center text-muted-foreground">Loading experiences...</div>
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
              <h1 className="font-display text-3xl font-bold text-foreground">Manage Experience</h1>
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
          {/* Add Experience Button */}
          <div className="flex justify-end">
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </div>

          {/* Experiences List */}
          {experiences && experiences.length > 0 ? (
            <div className="space-y-4">
              {experiences.map(exp => (
                <Card key={exp._id} className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-foreground">{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="font-medium text-foreground">{exp.company}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </p>
                      </div>
                    </div>

                    {exp.description && (
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="text-sm text-foreground">{exp.description}</p>
                      </div>
                    )}

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Responsibilities
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-sm text-foreground">
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(exp)}
                        className="flex-1 gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteConfirm(exp)}
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
              <p className="text-muted-foreground mb-4">No experiences yet. Add your first experience!</p>
              <Button onClick={handleAdd} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Experience
              </Button>
            </Card>
          )}
            </div>
          </motion.div>

          {/* Experience Form Dialog */}
          <ExperienceForm
            open={formOpen}
            onOpenChange={setFormOpen}
            onSubmit={refetch}
            experience={selectedExp}
          />

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Experience?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{expToDelete?.title}" at {expToDelete?.company}?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </GridBackground>
  );
};

export default AdminExperience;
