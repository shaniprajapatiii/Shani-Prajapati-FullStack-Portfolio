import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Share2 } from 'lucide-react';


const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  'shaniprajapati630@gmail.com'
)}&su=${encodeURIComponent('')}&body=${encodeURIComponent('')}`;


const socials = [
  { icon: Instagram, href: 'https://instagram.com/shaniprajapatiii', label: 'Instagram', color: 'var(--secondary)' },
  { icon: Github, href: 'https://github.com/shaniprajapatiii', label: 'GitHub', color: 'var(--primary)' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shaniprajapatiii', label: 'LinkedIn', color: 'var(--neon-blue)' },
  { icon: Mail, href: emailComposeUrl, label: 'Email', color: 'var(--accent)' },
];

const SocialCircle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && socials.map((social, index) => {
          // Position icons in a semicircle going left and up from the button
          const angle = (index * 45 + 135) * (Math.PI / 180); // Start at 135° (top-left) and go counterclockwise
          const radius = 70;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-card border border-primary/30 hover:border-primary transition-colors"
              style={{
                boxShadow: `0 0 20px hsl(${social.color} / 0.3)`,
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                x, 
                y, 
                opacity: 1,
              }}
              exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: index * 0.05,
              }}
              whileHover={{ 
                scale: 1.2,
                boxShadow: `0 0 30px hsl(${social.color} / 0.6)`,
              }}
            >
              <social.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
            </motion.a>
          );
        })}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          boxShadow: isOpen 
            ? '0 0 40px hsl(var(--primary) / 0.6)' 
            : '0 0 20px hsl(var(--primary) / 0.4)',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Share2 className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
        
        {/* Pulsing ring */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </div>
  );
};

export default SocialCircle;
