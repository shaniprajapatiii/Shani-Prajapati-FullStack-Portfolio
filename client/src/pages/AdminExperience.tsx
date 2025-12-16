import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useExperience } from '@/hooks/useApi';
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

export const AdminExperience = () => {
  const { data: experiences, loading: dataLoading, refetch } = useExperience();
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [expToDelete, setExpToDelete] = useState<Experience | null>(null);

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
      <div className="p-6">
        <div className="text-center text-gray-500">Loading experiences...</div>
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
          <h1 className="text-3xl font-bold">Manage Experience</h1>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          + Add Experience
        </Button>
      </div>

      {experiences && experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map(exp => (
            <Card key={exp._id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                    <p className="font-medium">{exp.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-medium">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </p>
                  </div>
                </div>

                {exp.description && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Responsibilities
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm">
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
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteConfirm(exp)}
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
          <p className="text-gray-500 mb-4">No experiences yet. Add your first experience!</p>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            Add First Experience
          </Button>
        </Card>
      )}

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

export default AdminExperience;
