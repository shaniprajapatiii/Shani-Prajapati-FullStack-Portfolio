import { useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
import { useProjects } from '../hooks/useApi';
import { ProjectResponse } from '../lib/formatters';

const ProjectModal = ({ project, onClose }: { project: ProjectResponse; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-primary/30 rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 60px hsl(var(--primary) / 0.3)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Project image */}
        <div 
          className="h-48 w-full relative"
          style={{ 
            background: project.imageUrl 
              ? `url(${project.imageUrl}) center/cover` 
              : (project.gradient || 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)')
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            {project.title}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {project.fullDescription || project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-primary/10 border border-primary/30 rounded-full text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4">
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon flex items-center gap-2 text-sm"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, onViewDetails }: { project: ProjectResponse; index: number; onViewDetails: () => void }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-80 md:w-96"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="card-neon h-full overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 40px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.1)',
        }}
      >
        {/* Project image/gradient */}
        <div 
          className="h-48 w-full relative overflow-hidden"
          style={{ 
            background: project.imageUrl 
              ? `url(${project.imageUrl}) center/cover` 
              : (project.gradient || 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)')
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-card to-transparent"
          />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-primary/10 border border-primary/20 rounded text-primary"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <motion.button
              onClick={onViewDetails}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.button>
            {project.links?.repo && (
              <motion.a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Github className="w-4 h-4" />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { data: projects, loading, error } = useProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);

  const scrollToProject = (index: number) => {
    if (!containerRef.current || !projects) return;
    const newIndex = Math.max(0, Math.min(index, projects.length - 1));
    setCurrentIndex(newIndex);
    const cardWidth = 384 + 24;
    const scrollPosition = newIndex * cardWidth;
    containerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const goNext = () => scrollToProject(currentIndex + 1);
  const goPrev = () => scrollToProject(currentIndex - 1);

  if (loading) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error || !projects || projects.length === 0) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="text-center text-muted-foreground">
          <p>No projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-neon-glow">Featured</span>{' '}
          <span className="text-foreground">Projects</span>
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Here's some stuff I've shipped. Each project is a piece of my soul (and a lot of caffeine).
        </motion.p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-card/50 border border-primary/30 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={goNext}
          disabled={currentIndex === projects.length - 1}
          className="p-3 rounded-full bg-card/50 border border-primary/30 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={containerRef}
        className="overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-6 px-6 min-w-max">
          <div className="w-[calc(50vw-12rem)]" />
          {projects.map((project, index) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              index={index}
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
          <div className="w-[calc(50vw-12rem)]" />
        </div>
      </div>

      {/* Scroll progress */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="h-1 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
          />
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="relative max-w-6xl mx-auto pointer-events-none">
        <motion.div
          className="absolute -top-20 right-10 w-32 h-32 rounded-full border border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-10 left-10 w-20 h-20 rounded-full border border-secondary/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
