import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthenticatedApi } from '@/hooks/useAuthenticatedApi';
import { Mail, Trash2, X, ArrowLeft, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import GridBackground from '@/components/GridBackground';
import { motion } from 'framer-motion';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminMessages = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getById, remove, loading } = useAuthenticatedApi();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoadingMessages(true);
      const data = await getById<{ success: boolean; data: Message[] }>('/messages');
      if (data && data.data) {
        setMessages(data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const success = await remove(`/messages/${messageId}`);
      if (success) {
        setMessages(messages.filter(m => m._id !== messageId));
        setIsModalOpen(false);
        toast.success('Message deleted successfully');
      } else {
        toast.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
              <h1 className="font-display text-3xl font-bold text-foreground">Contact Messages</h1>
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

          {/* Messages Count */}
          <Card className="mb-6 bg-card/50 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                  <p className="text-2xl font-bold text-foreground">{messages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages List */}
          <div className="space-y-4">
            {isLoadingMessages ? (
              <Card className="bg-card/50 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">Loading messages...</p>
                </CardContent>
              </Card>
            ) : messages.length === 0 ? (
              <Card className="bg-card/50 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No messages yet</p>
                </CardContent>
              </Card>
            ) : (
              messages.map((msg) => (
                <Card
                  key={msg._id}
                  className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => handleViewMessage(msg)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{msg.subject}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          From: <span className="text-primary">{msg.name}</span> ({msg.email})
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
                        <p className="text-xs text-muted-foreground/50 mt-2">
                          {formatDate(msg.createdAt)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(msg._id);
                        }}
                        className="text-destructive hover:text-destructive"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </motion.div>

        {/* Message Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl bg-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-foreground">{selectedMessage?.subject}</DialogTitle>
              <DialogClose />
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">From:</span> {selectedMessage.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                      {selectedMessage.email}
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground/50">
                    <span className="font-semibold">Date:</span> {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>
                <div className="border-t border-primary/20 pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Message:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteMessage(selectedMessage._id)}
                    disabled={loading}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </GridBackground>
  );
};

export default AdminMessages;
