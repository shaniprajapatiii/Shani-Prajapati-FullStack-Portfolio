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

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  project?: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    fullDescription: string;
    gradient: string;
    features?: string[];
    imageUrl?: string;
    technologies?: string[];
  } | null;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  project,
}) => {
  const { create, update, loading, error } = useAuthenticatedApi();
  const { toast } = useToast();
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    fullDescription: project?.fullDescription || '',
    gradient: project?.gradient || 'from-blue-500 to-purple-600',
    features: project?.features || [''],
    imageUrl: project?.imageUrl || '',
    techStack: (project as any)?.techStack || (project as any)?.technologies || [''],
    links: (project as any)?.links || { live: '', repo: '' },
  });

  const [uploading, setUploading] = useState(false);

  const [showColorPicker, setShowColorPicker] = useState(false);

  const GRADIENT_OPTIONS = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-pink-500 to-red-500',
    'from-orange-500 to-yellow-500',
    'from-indigo-500 to-blue-600',
    'from-cyan-500 to-blue-500',
    'from-amber-500 to-rose-500',
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

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Upload failed', description: 'Only image files are allowed', variant: 'destructive' });
      return;
    }
    const form = new FormData();
    form.append('file', file);
    setUploading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Image upload failed');
      }
      const data = await res.json();
      setFormData(prev => ({ ...prev, imageUrl: data.url }));
      toast({ title: 'Image uploaded', description: 'Image attached to this project.' });
    } catch (err) {
      toast({ title: 'Upload failed', description: err instanceof Error ? err.message : 'Unable to upload', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      techStack: [...prev.techStack, ''],
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const updateTechnology = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.map((t, i) => (i === index ? value : t)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({
        title: 'Error',
        description: 'Title and slug are required',
        variant: 'destructive',
      });
      return;
    }

    const dataToSend = {
      ...formData,
      features: formData.features.filter(f => f.trim()),
      techStack: formData.techStack.filter(t => t.trim()),
    };

    const endpoint = project ? `/projects/${project._id}` : '/projects';
    const result = await (project
      ? update(endpoint, dataToSend)
      : create(endpoint, dataToSend));

    if (result) {
      toast({
        title: 'Success',
        description: `Project ${project ? 'updated' : 'created'} successfully!`,
      });
      onOpenChange(false);
      onSubmit();
    } else {
      toast({
        title: 'Error',
        description: error || 'Failed to save project',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
          <DialogDescription>
            {project ? 'Update your project details' : 'Create a new project'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., E-commerce Platform"
              disabled={loading}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug (no spaces, lowercase)</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                }))
              }
              placeholder="e-commerce-platform"
              disabled={loading}
            />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Short Description (1-2 sentences)</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief overview shown in list view"
              rows={2}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-700"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Detailed project description"
              rows={4}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-700"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Project Image</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">Option 1: paste an image URL. Option 2: upload from your computer and we’ll store it in Cloudinary.</p>
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-md p-4 flex flex-col gap-3 items-center text-sm text-gray-500 dark:text-gray-300 bg-white/50 dark:bg-slate-900/50"
            >
              <div className="flex items-center gap-3 w-full">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
                <label className="shrink-0">
                  <span className="sr-only">Upload image</span>
                  <input id="project-image-file" type="file" accept="image/*" className="hidden" onChange={handleBrowse} />
                  <Button type="button" variant="outline" size="sm" disabled={uploading || loading} asChild>
                    <span>{uploading ? 'Uploading...' : 'Browse'}</span>
                  </Button>
                </label>
              </div>
              <div className="text-xs">Drop an image file here to upload to Cloudinary.</div>
              {formData.imageUrl && (
                <>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full max-h-48 object-cover rounded-md border border-gray-200 dark:border-slate-800"
                  />
                  <div className="w-full text-xs text-left break-all text-gray-600 dark:text-gray-300">
                    Cloudinary URL: {formData.imageUrl}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Gradient */}
          <div className="space-y-2">
            <Label>Gradient / Color</Label>
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
              placeholder="from-sky-500 to-indigo-600 or linear-gradient(135deg, #0ea5e9, #6366f1)"
              disabled={loading}
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Key Features (Optional)</Label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={e => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  disabled={loading}
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
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
              onClick={addFeature}
              disabled={loading}
            >
              + Add Feature
            </Button>
          </div>

          {/* Technology Stack */}
          <div className="space-y-2">
            <Label>Technology Stack (Optional)</Label>
            {formData.techStack.map((tech, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={tech}
                  onChange={e => updateTechnology(index, e.target.value)}
                  placeholder={`Technology ${index + 1}`}
                  disabled={loading}
                />
                {formData.techStack.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTechnology(index)}
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
              onClick={addTechnology}
              disabled={loading}
            >
              + Add Technology
            </Button>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <Label>Links (Optional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="live">Live URL</Label>
                <Input
                  id="live"
                  name="live"
                  type="url"
                  value={formData.links?.live || ''}
                  onChange={e => setFormData(prev => ({ ...prev, links: { ...prev.links, live: e.target.value } }))}
                  placeholder="https://your-app.example.com"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo">Repo URL</Label>
                <Input
                  id="repo"
                  name="repo"
                  type="url"
                  value={formData.links?.repo || ''}
                  onChange={e => setFormData(prev => ({ ...prev, links: { ...prev.links, repo: e.target.value } }))}
                  placeholder="https://github.com/username/repo"
                  disabled={loading}
                />
              </div>
            </div>
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
              {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
