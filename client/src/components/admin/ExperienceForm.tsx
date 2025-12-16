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

interface ExperienceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  experience?: {
    _id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description?: string;
    responsibilities?: string[];
  } | null;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  experience,
}) => {
  const { create, update, loading, error } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: experience?.title || '',
    company: experience?.company || '',
    startDate: experience?.startDate ? experience.startDate.split('T')[0] : '',
    endDate: experience?.endDate ? experience.endDate.split('T')[0] : '',
    description: experience?.description || '',
    responsibilities: experience?.responsibilities || [''],
    isCurrently: !experience?.endDate,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ''],
    }));
  };

  const removeResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const updateResponsibility = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map((r, i) => (i === index ? value : r)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.company.trim() || !formData.startDate) {
      toast({
        title: 'Error',
        description: 'Title, company, and start date are required',
        variant: 'destructive',
      });
      return;
    }

    const dataToSend = {
      ...formData,
      endDate: formData.isCurrently ? undefined : (formData.endDate || undefined),
      responsibilities: formData.responsibilities.filter(r => r.trim()),
    };

    const endpoint = experience ? `/experience/${experience._id}` : '/experience';
    const result = await (experience
      ? update(endpoint, dataToSend)
      : create(endpoint, dataToSend));

    if (result) {
      toast({
        title: 'Success',
        description: `Experience ${experience ? 'updated' : 'created'} successfully!`,
      });
      onOpenChange(false);
      onSubmit();
    } else {
      toast({
        title: 'Error',
        description: error || 'Failed to save experience',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{experience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          <DialogDescription>
            {experience ? 'Update your work experience' : 'Add a new work experience'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              disabled={loading}
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Tech Corp"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief overview of the role"
              rows={3}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-700"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                disabled={loading || formData.isCurrently}
              />
            </div>
          </div>

          {/* Currently Working */}
          <div className="flex items-center gap-2">
            <input
              id="isCurrently"
              name="isCurrently"
              type="checkbox"
              checked={formData.isCurrently}
              onChange={handleChange}
              disabled={loading}
              className="w-4 h-4"
            />
            <Label htmlFor="isCurrently" className="cursor-pointer">
              I currently work here
            </Label>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <Label>Responsibilities (Optional)</Label>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={resp}
                  onChange={e => updateResponsibility(index, e.target.value)}
                  placeholder={`Responsibility ${index + 1}`}
                  disabled={loading}
                />
                {formData.responsibilities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResponsibility(index)}
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
              onClick={addResponsibility}
              disabled={loading}
            >
              + Add Responsibility
            </Button>
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
              {loading ? 'Saving...' : experience ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
