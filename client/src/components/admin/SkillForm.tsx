import React from 'react';
import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  skill?: {
    _id: string;
    name: string;
    category: string;
    icon: string;
    color: string;
  } | null;
}

const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
  'Languages',
  'Other',
];

const POPULAR_ICONS = [
  '⚛️', '🟦', '🐍', '☕', '🗄️', '🐘', '🟩', '🐘', '🔧', '🐳', '☁️',
  '📦', '💻', '🎨', '⚙️', '🚀', '📊', '🔌', '📱', '🌐'
];

export const SkillForm: React.FC<SkillFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  skill,
}) => {
  const { create, update, loading, error } = useAuthenticatedApi();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    category: skill?.category || 'Frontend',
    icon: skill?.icon || '⚙️',
    color: skill?.color || '#3178C6',
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Skill name is required',
        variant: 'destructive',
      });
      return;
    }

    const endpoint = skill ? `/skills/${skill._id}` : '/skills';
    const method = skill ? 'update' : 'create';

    const result = await (method === 'create'
      ? create(endpoint, formData)
      : update(endpoint, formData));

    if (result) {
      toast({
        title: 'Success',
        description: `Skill ${skill ? 'updated' : 'created'} successfully!`,
      });
      onOpenChange(false);
      onSubmit();
      setFormData({
        name: '',
        category: 'Frontend',
        icon: '⚙️',
        color: '#3178C6',
      });
    } else {
      toast({
        title: 'Error',
        description: error || 'Failed to save skill',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{skill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
          <DialogDescription>
            {skill ? 'Update the skill details' : 'Create a new technical skill'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Skill Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., React, Python, SQL"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-700"
            >
              {SKILL_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label>Icon (Click to select)</Label>
            <div className="grid grid-cols-5 gap-2">
              {POPULAR_ICONS.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`text-3xl p-2 rounded border-2 transition ${
                    formData.icon === icon
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-300 dark:border-slate-700'
                  }`}
                  disabled={loading}
                >
                  {icon}
                </button>
              ))}
            </div>
            <Input
              type="text"
              value={formData.icon}
              onChange={handleChange}
              name="icon"
              placeholder="Custom emoji"
              maxLength={2}
              disabled={loading}
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                disabled={loading}
                className="w-12 h-10 rounded border border-gray-300 dark:border-slate-700"
                style={{ backgroundColor: formData.color }}
                title="Click to pick color"
              />
              <Input
                id="color"
                name="color"
                type="text"
                value={formData.color}
                onChange={handleChange}
                placeholder="#3178C6"
                disabled={loading}
              />
            </div>
            {showColorPicker && (
              <div className="grid grid-cols-6 gap-2 p-2 bg-gray-100 dark:bg-slate-900 rounded">
                {[
                  '#3178C6', '#61DAFB', '#F7DF1E', '#E34C26', '#F0DB4F', '#44B78B',
                  '#CE422B', '#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1',
                ].map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, color }));
                      setShowColorPicker(false);
                    }}
                    disabled={loading}
                    className="w-8 h-8 rounded border-2 border-gray-400"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
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
              {loading ? 'Saving...' : skill ? 'Update Skill' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillForm;
