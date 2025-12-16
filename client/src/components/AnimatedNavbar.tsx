import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const GlitchText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  return (
    <span className="relative inline-block">
      <span className={`${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-150`}>
        {text}
      </span>
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-primary"
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [1, 0.8, 1, 0.9, 1],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-secondary"
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0.8, 1, 0.9, 1, 0.8],
            }}
            transition={{ duration: 0.3, repeat: Infinity, delay: 0.05 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
};

const AnimatedNavbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active section based on scroll position
  useState(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollToSection = (href: string, index: number) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className="flex items-center gap-4 md:gap-8 px-4 md:px-8 py-3 rounded-full bg-card/50 backdrop-blur-xl border border-primary/20 overflow-x-auto scrollbar-hide md:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors font-display tracking-wider whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlitchText text={item.label} isHovered={hoveredIndex === index} />
              
              {/* Underline animation */}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Scroll Progress Line - Fixed at Bottom */}
      <motion.div
        className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-50"
        style={{ scaleX, width: '100%' }}
      />
    </motion.nav>
  );
};

export default AnimatedNavbar;
