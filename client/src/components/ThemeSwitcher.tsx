import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      root.style.setProperty('--background', '220 20% 4%');
      root.style.setProperty('--foreground', '180 100% 95%');
      root.style.setProperty('--card', '220 20% 8%');
      root.style.setProperty('--card-foreground', '180 100% 95%');
      root.style.setProperty('--popover', '220 20% 6%');
      root.style.setProperty('--popover-foreground', '180 100% 95%');
      root.style.setProperty('--muted', '220 15% 15%');
      root.style.setProperty('--muted-foreground', '220 10% 60%');
      root.style.setProperty('--border', '180 50% 20%');
      root.style.setProperty('--input', '220 15% 15%');
      root.style.setProperty('--primary', '180 100% 50%');
      root.style.setProperty('--primary-foreground', '220 20% 4%');
      root.style.setProperty('--secondary', '85 85% 50%');
      root.style.setProperty('--accent', '200 100% 55%');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      // Dimmed light palette (off-white background, softer contrast)
      root.style.setProperty('--background', '210 20% 92%');
      root.style.setProperty('--foreground', '220 25% 18%');
      root.style.setProperty('--card', '0 0% 98%');
      root.style.setProperty('--card-foreground', '220 25% 18%');
      root.style.setProperty('--popover', '0 0% 98%');
      root.style.setProperty('--popover-foreground', '220 25% 18%');
      root.style.setProperty('--muted', '210 15% 82%');
      root.style.setProperty('--muted-foreground', '220 12% 32%');
      root.style.setProperty('--border', '220 15% 55%');
      root.style.setProperty('--input', '210 15% 88%');
      root.style.setProperty('--primary', '180 80% 30%');
      root.style.setProperty('--primary-foreground', '0 0% 100%');
      root.style.setProperty('--secondary', '85 70% 40%');
      root.style.setProperty('--accent', '200 80% 45%');
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-card border border-primary/30 hover:border-primary transition-colors"
      style={{
        boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 0 30px hsl(var(--primary) / 0.6)',
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-primary" />
        ) : (
          <Sun className="w-5 h-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitcher;
