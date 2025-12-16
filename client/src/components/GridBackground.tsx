import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiquidDrop {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
}

const GridBackground = ({ children }: { children: React.ReactNode }) => {
  const [drops, setDrops] = useState<LiquidDrop[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const dropIdRef = useRef(0);

  const createEffect = useCallback((x: number, y: number) => {
    const id = dropIdRef.current++;

    // Add liquid drop
    setDrops(prev => [...prev, { id, x, y }]);

    // Add burst particles
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: id * 100 + i,
        x,
        y,
        angle: (i * 45) * (Math.PI / 180),
        color: colors[i % colors.length],
      });
    }
    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setDrops(prev => prev.filter(drop => drop.id !== id));
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 800);
  }, []);

  // Listen to clicks on the entire window
  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      createEffect(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [createEffect]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path 
                d="M 50 0 L 0 0 0 50" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="0.5"
                className="animate-pulse"
              />
            </pattern>
            <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#gridFade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridMask)" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute right-0 top-1/3 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: 'hsl(var(--secondary))' }}
          animate={{
            x: [0, -80, -40, 0],
            y: [0, 80, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: 'hsl(var(--accent))' }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -60, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Liquid drops - centered with dot in middle */}
      <AnimatePresence>
        {drops.map(drop => (
          <motion.div
            key={drop.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: drop.x,
              top: drop.y,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Expanding ring */}
            <motion.div 
              className="absolute rounded-full border-2 border-primary"
              style={{
                width: 120,
                height: 120,
                left: -60,
                top: -60,
                boxShadow: '0 0 30px hsl(var(--primary) / 0.5)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Center dot */}
            <motion.div 
              className="absolute rounded-full bg-primary"
              style={{
                width: 12,
                height: 12,
                left: -6,
                top: -6,
                boxShadow: '0 0 20px hsl(var(--primary))',
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Burst particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{ 
              scale: 1, 
              opacity: 1,
              x: 0,
              y: 0,
            }}
            animate={{ 
              scale: 0,
              opacity: 0,
              x: Math.cos(particle.angle) * 100,
              y: Math.sin(particle.angle) * 100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                background: `hsl(${particle.color})`,
                boxShadow: `0 0 10px hsl(${particle.color})`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;
