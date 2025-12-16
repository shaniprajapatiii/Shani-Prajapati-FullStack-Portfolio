import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkills } from '../hooks/useApi';

interface Skill {
  _id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
  proficiency?: number;
  order?: number;
}

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'];

interface SkillBubble {
  id: number;
  skill: Skill;
  x: number;
  y: number;
}

const SkillsSection = () => {
  const { data: skills, loading, error } = useSkills();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<SkillBubble[]>([]);
  const [bubbleId, setBubbleId] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? (skills || [])
    : (skills || []).filter(skill => skill.category === activeCategory);

  if (loading) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error || !skills) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="text-center text-muted-foreground">
          <p>Unable to load skills at the moment.</p>
        </div>
      </section>
    );
  }

  const handleSkillClick = (skill: Skill, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newBubble: SkillBubble = {
      id: bubbleId,
      skill,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    
    setBubbles(prev => [...prev, newBubble]);
    setBubbleId(prev => prev + 1);

    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 2000);
  };

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-neon-glow">My</span>{' '}
          <span className="text-foreground">Skills</span>
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Hover to reveal, click to pop! These are the tools I use to create digital magic. ✨
        </motion.p>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card/80 text-foreground border-primary/20 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: activeCategory === category 
                  ? '0 0 20px hsl(var(--primary) / 0.5)' 
                  : 'none',
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6 justify-items-center"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.button
                key={skill.name}
                className="relative group"
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={(e) => handleSkillClick(skill, e)}
              >
                {/* Skill button */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card/80 border border-primary/20 flex items-center justify-center text-2xl md:text-3xl cursor-pointer backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.1,
                    borderColor: `hsl(${skill.color})`,
                    boxShadow: `0 0 30px hsl(${skill.color} / 0.5)`,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {skill.icon}
                </motion.div>

                {/* Skill name tooltip */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-card border border-primary/30 rounded-lg whitespace-nowrap z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        boxShadow: `0 0 15px hsl(${skill.color} / 0.3)`,
                      }}
                    >
                      <span className="text-xs md:text-sm font-medium" style={{ color: `hsl(${skill.color})` }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                  style={{
                    background: `radial-gradient(circle, hsl(${skill.color} / 0.2) 0%, transparent 70%)`,
                  }}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating bubbles */}
        <AnimatePresence>
          {bubbles.map(bubble => (
            <motion.div
              key={bubble.id}
              className="fixed pointer-events-none z-50 flex items-center justify-center"
              style={{
                left: bubble.x,
                top: bubble.y,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [1, 0.8, 0],
                y: -100,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-card/80 border-2"
                style={{
                  borderColor: `hsl(${bubble.skill.color})`,
                  boxShadow: `0 0 30px hsl(${bubble.skill.color} / 0.6)`,
                }}
              >
                {bubble.skill.icon}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;
