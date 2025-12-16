import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useSkills } from '@/hooks/useApi';
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
import SkillForm from '@/components/admin/SkillForm';

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  order?: number;
}

export const AdminSkills = () => {
  const { data: skills, loading: dataLoading, refetch } = useSkills();
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const handleAdd = () => {
    setSelectedSkill(null);
    setFormOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!skillToDelete) return;

    const success = await remove(`/skills/${skillToDelete._id}`);
    if (success) {
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });
      setDeleteConfirmOpen(false);
      setSkillToDelete(null);
      refetch();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };

  const openDeleteConfirm = (skill: Skill) => {
    setSkillToDelete(skill);
    setDeleteConfirmOpen(true);
  };

  if (dataLoading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Loading skills...</div>
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
          <h1 className="text-3xl font-bold">Manage Skills</h1>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          + Add Skill
        </Button>
      </div>

      {skills && skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(skill => (
            <Card key={skill._id} className="hover:shadow-lg transition">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-3xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium">{skill.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: skill.color }}
                    />
                    <p className="font-mono text-sm">{skill.color}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(skill)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteConfirm(skill)}
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
          <p className="text-gray-500 mb-4">No skills yet. Add your first skill!</p>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            Add First Skill
          </Button>
        </Card>
      )}

      {/* Skill Form Dialog */}
      <SkillForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={refetch}
        skill={selectedSkill}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{skillToDelete?.name}"? This action cannot be
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

export default AdminSkills;
