import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSkills } from '@/hooks/useApi';
import { useExperience } from '@/hooks/useApi';
import { useProjects } from '@/hooks/useApi';
import { useCertificates } from '@/hooks/useApi';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: skills } = useSkills();
  const { data: experience } = useExperience();
  const { data: projects } = useProjects();
  const { data: certificates } = useCertificates();

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const stats = [
    {
      title: 'Skills',
      count: skills?.length || 0,
      color: 'from-blue-500 to-purple-600',
      route: '/admin/skills',
    },
    {
      title: 'Experience',
      count: experience?.length || 0,
      color: 'from-green-500 to-teal-600',
      route: '/admin/experience',
    },
    {
      title: 'Projects',
      count: projects?.length || 0,
      color: 'from-pink-500 to-red-500',
      route: '/admin/projects',
    },
    {
      title: 'Certificates',
      count: certificates?.length || 0,
      color: 'from-orange-500 to-yellow-500',
      route: '/admin/certificates',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Neon grid background for consistency with main site */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.08)_0,transparent_30%),radial-gradient(circle_at_80%_0%,hsl(var(--secondary)/0.08)_0,transparent_30%),radial-gradient(circle_at_50%_80%,hsl(var(--accent)/0.08)_0,transparent_30%)]" />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-display text-3xl font-bold">
                <span className="text-neon-glow">Admin</span>{' '}
                <span className="text-foreground">Dashboard</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome, {user?.name || user?.email}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {stats.map(stat => (
            <Card
              key={stat.title}
              className="cursor-pointer card-neon hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)] transition will-change-transform"
              onClick={() => navigate(stat.route)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-display">
                  <span className="text-foreground">{stat.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`h-20 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center border border-primary/20`}>
                    <span className="text-4xl font-bold text-white drop-shadow-lg">{stat.count}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary/10"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(stat.route);
                    }}
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="card-neon">
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/skills')}
                className="h-20 flex-col gap-2 hover:bg-primary/10"
              >
                <span className="text-2xl">⚙️</span>
                <span>Add Skill</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/experience')}
                className="h-20 flex-col gap-2 hover:bg-primary/10"
              >
                <span className="text-2xl">💼</span>
                <span>Add Experience</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/projects')}
                className="h-20 flex-col gap-2 hover:bg-primary/10"
              >
                <span className="text-2xl">📁</span>
                <span>Add Project</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/certificates')}
                className="h-20 flex-col gap-2 hover:bg-primary/10"
              >
                <span className="text-2xl">🏆</span>
                <span>Add Certificate</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <Card className="card-neon">
            <CardHeader>
              <CardTitle className="text-base font-display">📝 Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Use emoji icons for skills to make them visually appealing</p>
              <p>✓ Add gradients to projects to enhance visual hierarchy</p>
              <p>✓ List key responsibilities for each experience</p>
              <p>✓ Include verification URLs for certificates</p>
            </CardContent>
          </Card>

          <Card className="card-neon">
            <CardHeader>
              <CardTitle className="text-base font-display">🔧 Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Skills:</strong> Technical abilities with icons and colors</p>
              <p>• <strong>Experience:</strong> Work history and achievements</p>
              <p>• <strong>Projects:</strong> Portfolio showcase with features</p>
              <p>• <strong>Certificates:</strong> Credentials and training</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
