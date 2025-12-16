import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { useCertificates } from '@/hooks/useApi';
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

export const AdminCertificates = () => {
  const { data: certificates, loading: dataLoading, refetch } = useCertificates();
  const { remove, loading: deleteLoading } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState<Certificate | null>(null);

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
      <div className="p-6">
        <div className="text-center text-gray-500">Loading certificates...</div>
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
          <h1 className="text-3xl font-bold">Manage Certificates</h1>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          + Add Certificate
        </Button>
      </div>

      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map(cert => (
            <Card
              key={cert._id}
              className="hover:shadow-lg transition overflow-hidden"
            >
              <div
                className={`h-1 bg-gradient-to-r ${cert.gradient}`}
              />
              <CardHeader>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issuer</p>
                    <p className="font-medium text-sm">{cert.issuer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issue Date</p>
                    <p className="font-medium text-sm">
                      {formatDate(cert.issueDate)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Description
                  </p>
                  <p className="text-sm line-clamp-2">{cert.description}</p>
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cert.highlights && cert.highlights.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Highlights
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {cert.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="text-xs">
                          {highlight}
                        </li>
                      ))}
                      {cert.highlights.length > 2 && (
                        <li className="text-xs text-gray-500">
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
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteConfirm(cert)}
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
          <p className="text-gray-500 mb-4">No certificates yet. Add your first certificate!</p>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            Add First Certificate
          </Button>
        </Card>
      )}

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
    </div>
  );
};

export default AdminCertificates;
