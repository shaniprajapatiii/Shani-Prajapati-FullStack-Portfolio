import { motion } from 'framer-motion';
import { Briefcase, MessageCircle, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const taglines = ["MERN Stack Developer", "Open Source Contributor"];

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = taglines[currentTagline];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === text) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? text.substring(0, displayText.length - 1)
          : text.substring(0, displayText.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline]);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.p
          className="text-primary font-medium tracking-widest mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          WELCOME TO MY DIGITAL SPACE
        </motion.p>

        {/* Main title with kinetic typography */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block text-neon-glow">Hi, I'm</span>
          <motion.span 
            className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            Shani Prajapati
          </motion.span>
        </motion.h1>

        {/* Typing Tagline */}
        <motion.div
          className="text-2xl md:text-3xl font-semibold mb-6 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-primary">{displayText}</span>
          <span className="animate-pulse text-secondary">|</span>
        </motion.div>

        {/* Subtitle with flicker */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-flicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Crafting digital experiences that hit different. 
          <span className="text-primary"> Code</span> meets 
          <span className="text-secondary"> creativity</span> meets 
          <span className="text-accent"> chaos</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#projects"
            className="btn-neon font-display flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Briefcase className="w-4 h-4" />
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary font-display flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <MessageCircle className="w-4 h-4" />
            Let's Connect
          </motion.a>
        </motion.div>

        {/* Admin Portal Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="flex justify-center mb-8 py-3"
        >
          <Link to="/admin">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 text-sm bg-card/50 border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 15px hsl(var(--primary) / 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-4 h-4" />
              Admin Portal
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-6 h-6 border-2 border-secondary rotate-45 opacity-40"
            animate={{
              rotate: [45, 225, 45],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent opacity-50"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{
              y: [0, 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
