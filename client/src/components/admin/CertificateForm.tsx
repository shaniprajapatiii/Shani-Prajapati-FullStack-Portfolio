import React, { useState } from 'react';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface CertificateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  certificate?: {
    _id: string;
    title: string;
    issuer: string;
    issueDate: string;
    description: string;
    gradient: string;
    skills?: string[];
    highlights?: string[];
    verificationUrl?: string;
  } | null;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  certificate,
}) => {
  const { create, update, loading, error } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: certificate?.title || '',
    issuer: certificate?.issuer || '',
    issueDate: certificate?.issueDate ? certificate.issueDate.split('T')[0] : '',
    description: certificate?.description || '',
    gradient: certificate?.gradient || 'from-cyan-500 to-blue-500',
    skills: certificate?.skills || [''],
    highlights: certificate?.highlights || [''],
    verificationUrl: certificate?.verificationUrl || '',
  });

  const GRADIENT_OPTIONS = [
    'from-cyan-500 to-blue-500',
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-pink-500 to-red-500',
    'from-orange-500 to-yellow-500',
    'from-slate-700 via-slate-900 to-black',
  ];

  const COLOR_SWATCHES = [
    '#0ea5e9',
    '#6366f1',
    '#22c55e',
    '#f59e0b',
    '#ec4899',
    '#14b8a6',
    '#111827',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => (i === index ? value : s)),
    }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => (i === index ? value : h)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.issuer.trim()) {
      toast({
        title: 'Error',
        description: 'Title and issuer are required',
        variant: 'destructive',
      });
      return;
    }

    const dataToSend = {
      ...formData,
      skills: formData.skills.filter(s => s.trim()),
      highlights: formData.highlights.filter(h => h.trim()),
    };

    const endpoint = certificate
      ? `/certificates/${certificate._id}`
      : '/certificates';
    const result = await (certificate
      ? update(endpoint, dataToSend)
      : create(endpoint, dataToSend));

    if (result) {
      toast({
        title: 'Success',
        description: `Certificate ${certificate ? 'updated' : 'created'} successfully!`,
      });
      onOpenChange(false);
      onSubmit();
    } else {
      toast({
        title: 'Error',
        description: error || 'Failed to save certificate',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{certificate ? 'Edit Certificate' : 'Add Certificate'}</DialogTitle>
          <DialogDescription>
            {certificate
              ? 'Update certificate details'
              : 'Add a new certification or achievement'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Certificate Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., AWS Solutions Architect"
              disabled={loading}
            />
          </div>

          {/* Issuer */}
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="e.g., Amazon Web Services"
              disabled={loading}
            />
          </div>

          {/* Issue Date */}
          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              name="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What this certification covers"
              rows={3}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-700"
            />
          </div>

          {/* Gradient */}
          <div className="space-y-2">
            <Label>Accent Gradient / Color</Label>
            <div className="grid grid-cols-3 gap-2">
              {GRADIENT_OPTIONS.map(grad => (
                <button
                  key={grad}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, gradient: grad }))}
                  className={`h-10 rounded border-2 bg-gradient-to-r ${grad} transition ${
                    formData.gradient === grad
                      ? 'border-gray-800 dark:border-white'
                      : 'border-gray-300 dark:border-slate-700'
                  }`}
                  disabled={loading}
                />
              ))}
              {COLOR_SWATCHES.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, gradient: color }))}
                  className={`h-10 rounded border-2 transition ${
                    formData.gradient === color
                      ? 'border-gray-800 dark:border-white'
                      : 'border-gray-300 dark:border-slate-700'
                  }`}
                  style={{ background: color }}
                  disabled={loading}
                />
              ))}
            </div>
            <Input
              name="gradient"
              value={formData.gradient}
              onChange={handleChange}
              placeholder="from-cyan-500 to-blue-500 or linear-gradient(135deg, #0ea5e9, #6366f1)"
              disabled={loading}
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills Gained (Optional)</Label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={e => updateSkill(index, e.target.value)}
                  placeholder={`Skill ${index + 1}`}
                  disabled={loading}
                />
                {formData.skills.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(index)}
                    disabled={loading}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSkill}
              disabled={loading}
            >
              + Add Skill
            </Button>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <Label>Key Highlights (Optional)</Label>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={highlight}
                  onChange={e => updateHighlight(index, e.target.value)}
                  placeholder={`Highlight ${index + 1}`}
                  disabled={loading}
                />
                {formData.highlights.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeHighlight(index)}
                    disabled={loading}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addHighlight}
              disabled={loading}
            >
              + Add Highlight
            </Button>
          </div>

          {/* Verification URL */}
          <div className="space-y-2">
            <Label htmlFor="verificationUrl">Verification URL (Optional)</Label>
            <Input
              id="verificationUrl"
              name="verificationUrl"
              type="url"
              value={formData.verificationUrl}
              onChange={handleChange}
              placeholder="https://credentials.example.com/verify/123"
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-2 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 rounded text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-card/80 backdrop-blur border-t border-border -mx-6 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : certificate ? 'Update Certificate' : 'Add Certificate'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateForm;
