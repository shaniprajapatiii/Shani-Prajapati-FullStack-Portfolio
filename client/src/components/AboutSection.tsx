import { motion } from 'framer-motion';
import { FileText, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const OWNER_EMAIL = 'shaniprajapati630@gmail.com';

// Detect if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Mobile: open email app, Desktop: open Gmail web
const emailComposeUrl = isMobile 
  ? `mailto:${OWNER_EMAIL}`
  : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OWNER_EMAIL)}`;

const skills = [
  'Java', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 
  'UI/UX', 'Express.js', 'Postman', 'Docker'
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-neon-glow">About</span>{' '}
          <span className="text-foreground">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(var(--primary) / 0.5)',
                    '0 0 60px hsl(var(--secondary) / 0.5)',
                    '0 0 30px hsl(var(--primary) / 0.5)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full bg-card" />
              </motion.div>
              
              {/* Avatar image */}
              <motion.div
                className="absolute inset-2 rounded-full overflow-hidden"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img 
                  src="/shani.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              {/* Orbiting particles */}
              <motion.div
                className="absolute w-4 h-4 bg-primary rounded-full"
                style={{ top: '10%', left: '10%' }}
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Admin Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/admin">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-card/50 border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
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
          </motion.div>

          {/* Text content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Yo, I'm a <span className="text-primary font-semibold">full-stack developer</span> who's 
              lowkey obsessed with building cool stuff that actually works. Been in the game for a hot 
              minute, turning caffeine into code and ideas into reality.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              My vibe? Creating <span className="text-primary font-semibold">pixel-perfect</span> interfaces 
              that slap and backends that don't break when things get real. I'm all about that 
              <span className="text-accent font-semibold"> clean code life</span> and staying ahead of the curve.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not shipping features, you'll catch me exploring new tech, contributing to 
              open source, or touching grass (occasionally). Let's build something legendary together. 🚀
            </p>

            {/* Skill badges */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3 font-medium">QUICK STACK</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 text-sm bg-primary/10 border border-primary/30 rounded-full text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      borderColor: 'hsl(var(--primary))',
                      boxShadow: '0 0 15px hsl(var(--primary) / 0.5)'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                href="https://drive.google.com/file/d/1gQW_TO3ZpEoQPqCiyq1JuVjrp_0rqp91/view" 
                target='_blank'
                className="btn-neon flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4" />
                View Resume
              </motion.a>
              <motion.a
                href={emailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
