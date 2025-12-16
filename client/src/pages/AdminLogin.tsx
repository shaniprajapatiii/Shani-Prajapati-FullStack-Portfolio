import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      
      // Check if user is admin
      if (user?.role !== 'admin') {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Login successful!',
      });
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GridBackground>
      {/* Back button */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portfolio</span>
        </Link>
      </motion.div>

      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-6"
            animate={{
              boxShadow: [
                '0 0 20px hsl(var(--primary) / 0.3)',
                '0 0 40px hsl(var(--primary) / 0.5)',
                '0 0 20px hsl(var(--primary) / 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-10 h-10 text-primary" />
          </motion.div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            <span className="text-neon-glow">Admin</span>{' '}
            <span className="text-secondary">Portal</span>
          </h1>
          <p className="text-muted-foreground">
            Secure access for administrators only
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="card-neon p-8 space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-primary text-primary-foreground font-display font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            style={{
              boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
            }}
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Sign In
              </>
            )}
          </motion.button>

          {/* Security Notice */}
          <p className="text-center text-xs text-muted-foreground">
            This area is protected. Unauthorized access attempts are logged.
          </p>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Not an admin?{' '}
          <Link to="/" className="text-primary hover:underline">
            Return to portfolio
          </Link>
        </motion.p>
        </motion.div>
      </div>
    </GridBackground>
  );
};

export default AdminLogin;