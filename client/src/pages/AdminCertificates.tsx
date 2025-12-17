import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useCertificates } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit, Trash2, ExternalLink, LogOut } from 'lucide-react';
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
import { formatDate } from '@/lib/formatters';
import CertificateForm from '@/components/admin/CertificateForm';

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  gradient: string;
  skills?: string[];
  highlights?: string[];
  verificationUrl?: string;
}

const AdminCertificates = () => {
  const { data: certificates, loading: dataLoading, refetch } = useCertificates();
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState<Certificate | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const handleAdd = () => {
    setSelectedCert(null);
    setFormOpen(true);
  };

  const handleEdit = (cert: Certificate) => {
    setSelectedCert(cert);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!certToDelete) return;

    const success = await remove(`/certificates/${certToDelete._id}`);
    if (success) {
      toast({
        title: 'Success',
        description: 'Certificate deleted successfully',
      });
      setDeleteConfirmOpen(false);
      setCertToDelete(null);
      refetch();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete certificate',
        variant: 'destructive',
      });
    }
  };

  const openDeleteConfirm = (cert: Certificate) => {
    setCertToDelete(cert);
    setDeleteConfirmOpen(true);
  };

  if (dataLoading) {
    return (
      <GridBackground>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center text-muted-foreground">Loading certificates...</div>
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
            <h1 className="font-display text-3xl font-bold text-foreground">Manage Certificates</h1>
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
          {/* Add Certificate Button */}
          <div className="flex justify-end">
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Certificate
            </Button>
          </div>

          {/* Certificates Grid */}
          {certificates && certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map(cert => (
                <Card
                  key={cert._id}
                  className="bg-card/50 border-primary/20 hover:border-primary/40 transition overflow-hidden"
                >
                  <div
                    className={`h-1 bg-gradient-to-r ${cert.gradient}`}
                  />
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Issuer</p>
                        <p className="font-medium text-sm text-foreground">{cert.issuer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Issue Date</p>
                        <p className="font-medium text-sm text-foreground">
                        {formatDate(cert.issueDate)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Description
                      </p>
                      <p className="text-sm line-clamp-2 text-foreground">{cert.description}</p>
                    </div>

                    {cert.skills && cert.skills.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary/10 border border-primary/30 text-primary rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {cert.highlights && cert.highlights.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Highlights
                        </p>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {cert.highlights.slice(0, 2).map((highlight, idx) => (
                            <li key={idx} className="text-xs text-foreground">
                              {highlight}
                            </li>
                          ))}
                          {cert.highlights.length > 2 && (
                            <li className="text-xs text-muted-foreground">
                              +{cert.highlights.length - 2} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(cert)}
                        className="flex-1 gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteConfirm(cert)}
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
              <p className="text-muted-foreground mb-4">No certificates yet. Add your first certificate!</p>
              <Button onClick={handleAdd} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Certificate
              </Button>
            </Card>
          )}
        </div>

        {/* Certificate Form Dialog */}
      <CertificateForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={refetch}
        certificate={selectedCert}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{certToDelete?.title}"? This action cannot be
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
        </motion.div>
      </div>
    </GridBackground>
  );
};

export default AdminCertificates;
