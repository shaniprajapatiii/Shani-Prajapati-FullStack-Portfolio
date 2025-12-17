import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useSkills } from '@/hooks/useApi';
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
import SkillForm from '@/components/admin/SkillForm';

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  order?: number;
}

const AdminSkills = () => {
  const { data: skills, loading: dataLoading, refetch } = useSkills();
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

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
      <GridBackground>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center text-muted-foreground">Loading skills...</div>
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
              <h1 className="font-display text-3xl font-bold text-foreground">Manage Skills</h1>
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

          <div className="flex justify-end mb-6">
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </div>

          {/* Skills Grid */}
          {skills && skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map(skill => (
                <Card key={skill._id} className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-3xl">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <p>Category</p>
                      <p className="font-medium text-foreground">{skill.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Color</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-primary/30"
                          style={{ backgroundColor: skill.color }}
                        />
                        <p className="font-mono text-sm text-muted-foreground">{skill.color}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(skill)}
                        className="flex-1 gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteConfirm(skill)}
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
              <p className="text-muted-foreground mb-4">No skills yet. Add your first skill!</p>
              <Button onClick={handleAdd} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Skill
              </Button>
            </Card>
          )}
        </motion.div>
      </div>

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
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </GridBackground>
  );
};

export default AdminSkills;
