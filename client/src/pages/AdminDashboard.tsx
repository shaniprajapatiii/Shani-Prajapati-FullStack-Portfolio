import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSkills } from '@/hooks/useApi';
import { useExperience } from '@/hooks/useApi';
import { useProjects } from '@/hooks/useApi';
import { useCertificates } from '@/hooks/useApi';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { LogOut, FileText, Briefcase, Award, MessageSquare, Code, LayoutDashboard, Mail } from 'lucide-react';
import GridBackground from '@/components/GridBackground';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getById } = useAuthenticatedApi();
  const { data: skills } = useSkills();
  const { data: experience } = useExperience();
  const { data: projects } = useProjects();
  const { data: certificates } = useCertificates();
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    fetchMessagesCount();
  }, []);

  const fetchMessagesCount = async () => {
    try {
      const data = await getById<{ success: boolean; data: Array<any> }>('/messages');
      if (data && data.data) {
        setMessagesCount(data.data.length);
      }
    } catch (error) {
      console.error('Error fetching messages count:', error);
    }
  };

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
    {
      title: 'Messages',
      count: messagesCount,
      color: 'from-cyan-500 to-blue-600',
      route: '/admin/messages',
    },
  ];

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-foreground">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </span>
                <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-3 py-1">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-foreground/80">{user?.email ?? 'admin@example.com'}</span>
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Welcome back, {user?.name || 'Admin'}</span>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="gap-2 w-full sm:w-auto justify-center"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
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
              <Button
                variant="outline"
                onClick={() => navigate('/admin/messages')}
                className="h-20 flex-col gap-2 hover:bg-primary/10"
              >
                <span className="text-2xl">📧</span>
                <span>View Messages</span>
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
        </motion.div>
      </div>
    </GridBackground>
  );
};

export default AdminDashboard;
