import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'name' | 'welcome' | 'door' | 'complete'>('name');
  
  const name = "Shani Prajapati";
  const welcomeText = "Welcome To My Digital Space";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('welcome'), 1800),
      setTimeout(() => setPhase('door'), 3200),
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const letterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: i % 2 === 0 ? -100 : 100,
      x: i % 3 === 0 ? -50 : i % 3 === 1 ? 50 : 0,
      rotateX: i % 2 === 0 ? 90 : -90,
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-background" />
          
          {/* Light glow behind doors */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'door' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-[200px] h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-3xl" />
          </motion.div>

          {/* Left Door */}
          <motion.div
            className="absolute left-0 top-0 w-1/2 h-full bg-background z-10 origin-left"
            style={{ 
              boxShadow: phase === 'door' ? '10px 0 60px rgba(0,0,0,0.5)' : 'none',
              perspective: '1000px',
            }}
            initial={{ rotateY: 0, x: 0 }}
            animate={{
              rotateY: phase === 'door' ? -95 : 0,
              x: phase === 'door' ? -20 : 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Door edge highlight */}
            <motion.div
              className="absolute right-0 top-0 w-2 h-full bg-gradient-to-l from-primary/20 to-transparent"
              animate={{ opacity: phase === 'door' ? 1 : 0 }}
            />
            {/* Door surface texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-muted/20" />
          </motion.div>

          {/* Right Door */}
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full bg-background z-10 origin-right"
            style={{ 
              boxShadow: phase === 'door' ? '-10px 0 60px rgba(0,0,0,0.5)' : 'none',
              perspective: '1000px',
            }}
            initial={{ rotateY: 0, x: 0 }}
            animate={{
              rotateY: phase === 'door' ? 95 : 0,
              x: phase === 'door' ? 20 : 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Door edge highlight */}
            <motion.div
              className="absolute left-0 top-0 w-2 h-full bg-gradient-to-r from-primary/20 to-transparent"
              animate={{ opacity: phase === 'door' ? 1 : 0 }}
            />
            {/* Door surface texture */}
            <div className="absolute inset-0 bg-gradient-to-l from-background via-background to-muted/20" />
          </motion.div>

          {/* Center content (on doors) */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
            {/* Name Animation */}
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
              style={{ perspective: '1000px' }}
            >
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{
                    color: 'hsl(var(--primary))',
                    textShadow: '0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Welcome Text */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: phase === 'welcome' || phase === 'door' ? 1 : 0,
                y: phase === 'welcome' || phase === 'door' ? 0 : 30,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            >
              {welcomeText}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: phase === 'welcome' || phase === 'door' ? 200 : 0,
                opacity: phase === 'welcome' || phase === 'door' ? 1 : 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: 'easeOut',
              }}
            />
          </div>

          {/* Light rays spilling from center */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'door' ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-[200vh] w-[2px] bg-gradient-to-t from-transparent via-primary/10 to-transparent origin-center"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: phase === 'door' ? 1 : 0,
                  opacity: phase === 'door' ? 0.5 : 0,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
