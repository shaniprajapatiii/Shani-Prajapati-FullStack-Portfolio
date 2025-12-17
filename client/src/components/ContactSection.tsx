import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { toast } from 'sonner';

import { API_BASE_URL } from '@/lib/api';
const OWNER_EMAIL = 'shaniprajapati630@gmail.com';

const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  OWNER_EMAIL
)}&su=${encodeURIComponent('')}&body=${encodeURIComponent('')}`;

const socials = [
  { icon: Mail, href: emailComposeUrl, label: 'Email' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shaniprajapatiii', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/shaniprajapatiii', label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com/shaniprajapatiii', label: 'Instagram' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      toast.success("Message sent! I'll get back to you soon. 🚀");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-6 relative overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['💻', '🚀', '⚡', '🎨', '🔥', '✨', '💡', '🌟'][i]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-neon-glow">Let's</span>{' '}
          <span className="text-foreground">Connect</span>
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Got a project idea? Want to collab? Or just wanna say hi? 
          Slide into my inbox – I promise I don't bite. 🤙
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground placeholder:text-muted-foreground"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-neon flex items-center justify-center gap-2 font-display disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={isSubmitting ? { boxShadow: ['0 0 20px hsl(var(--primary) / 0.5)', '0 0 40px hsl(var(--primary) / 0.8)', '0 0 20px hsl(var(--primary) / 0.5)'] } : {}}
              transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>

          {/* Social links & info */}
          <motion.div
            className="flex flex-col justify-center items-center md:items-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center md:text-left mb-8">
              <h3 className="font-display text-2xl font-bold mb-4">
                Or find me on
              </h3>
              <p className="text-muted-foreground">
                I'm most active on Twitter/X. DMs are always open for interesting conversations!
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mb-8">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-card border border-primary/30 hover:border-primary transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 25px hsl(var(--primary) / 0.5)',
                  }}
                >
                  <social.icon className="w-6 h-6 text-foreground" />
                </motion.a>
              ))}
            </div>

            {/* Fun stat */}
            <motion.div
              className="card-neon p-6 text-center w-full"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-4xl font-display font-bold text-primary mb-2">
                &lt; 24hrs
              </p>
              <p className="text-muted-foreground text-sm">
                Average response time
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20 pt-10 border-t border-primary/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm">
            Designed & Built with 💜 and lots of ☕
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            © {new Date().getFullYear()} • Made different.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
