import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap, Award, Eye, X, ExternalLink } from 'lucide-react';
import { useExperience, useCertificates } from '../hooks/useApi';
import { ExperienceResponse, CertificateResponse } from '../lib/formatters';

interface Education {
  degree: string;
  institution: string;
  date: string;
  highlights: string[];
}

const education: Education[] = [
  {
    degree: "Bachelor's in Computer Science",
    institution: 'Tech University',
    date: '2014 - 2018',
    highlights: [
      'Graduated with First Class Honours (GPA: 3.8/4.0)',
      'Specialized in Software Engineering & Web Technologies',
      'Led university coding club and organized hackathons',
    ],
  },
  {
    degree: 'Higher Secondary (12th Grade)',
    institution: 'City Science College',
    date: '2012 - 2014',
    highlights: [
      'Science stream with Computer Science major',
      'Scored 92% in board examinations',
      'Won state-level programming competition',
    ],
  },
  {
    degree: 'Secondary School (10th Grade)',
    institution: 'Central High School',
    date: '2012',
    highlights: [
      'Completed with distinction (89%)',
      'First introduction to programming with C++',
      'Active member of science and math clubs',
    ],
  },
];

// Certificate Modal Component
const CertificateModal = ({ cert, onClose }: { cert: CertificateResponse; onClose: () => void }) => {
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

        {/* Certificate image/badge */}
        <div 
          className="h-48 w-full relative flex items-center justify-center"
          style={{ 
            background: cert.gradient || 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <motion.div
            className="relative z-10 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Award className="w-16 h-16 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {cert.title}
            </h2>
          </div>
          
          <p className="text-primary font-medium mb-2">{cert.issuer}</p>
          
          <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </div>
            {cert.credentialId && (
              <div className="text-xs bg-primary/10 px-2 py-1 rounded-full text-primary">
                ID: {cert.credentialId}
              </div>
            )}
          </div>
          
          {cert.description && (
            <p className="text-muted-foreground mb-6">
              {cert.description}
            </p>
          )}

          {/* Skills */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">Skills Covered</h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-primary/10 border border-primary/30 rounded-full text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verify button */}
          {cert.verificationUrl && (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon flex items-center gap-2 text-sm w-fit"
            >
              <ExternalLink className="w-4 h-4" />
              Verify Certificate
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Experience Modal Component
const ExperienceModal = ({ exp, onClose }: { exp: ExperienceResponse; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-primary/30 rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 60px hsl(var(--primary) / 0.3)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="h-32 w-full relative flex items-center justify-center bg-gradient-to-r from-primary to-accent">
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <motion.div
            className="relative z-10 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <Briefcase className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <div className="p-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">{exp.title}</h2>
          <p className="text-primary font-medium mb-2">{exp.company}</p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <Calendar className="w-4 h-4" />
            {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-2">Responsibilities</h3>
            <ul className="space-y-2">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Education Modal Component
const EducationModal = ({ edu, onClose }: { edu: Education; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-accent/30 rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 60px hsl(var(--accent) / 0.3)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="h-32 w-full relative flex items-center justify-center bg-gradient-to-r from-accent to-secondary">
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <motion.div
            className="relative z-10 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <GraduationCap className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <div className="p-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">{edu.degree}</h2>
          <p className="text-accent font-medium mb-2">{edu.institution}</p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <Calendar className="w-4 h-4" />
            {edu.date}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-2">Key Highlights</h3>
            <ul className="space-y-2">
              {edu.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

type EducationTab = 'education' | 'certifications';

const ExperienceSection = () => {
  const { data: experiences, loading: expLoading } = useExperience();
  const { data: certificates, loading: certLoading } = useCertificates();
  
  const [activeTab, setActiveTab] = useState<EducationTab>('education');
  const [selectedCert, setSelectedCert] = useState<CertificateResponse | null>(null);
  const [selectedExp, setSelectedExp] = useState<ExperienceResponse | null>(null);
  const [selectedEdu, setSelectedEdu] = useState<Education | null>(null);

  if (expLoading || certLoading) {
    return (
      <section id="experience" className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading experience...</p>
        </div>
      </section>
    );
  }

  if (!experiences || !certificates) {
    return (
      <section id="experience" className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="text-center text-muted-foreground">
          <p>Unable to load experience at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-neon-glow">Work</span>{' '}
          <span className="text-foreground">Experience</span>
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          My professional journey so far. Each role has been a level-up in my dev career. 📈
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 md:-translate-x-1/2 top-1"
                whileInView={{
                  boxShadow: [
                    '0 0 0 0 hsl(var(--primary) / 0.5)',
                    '0 0 0 10px hsl(var(--primary) / 0)',
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              {/* Content card */}
              <motion.div
                className={`card-neon p-6 ml-8 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px hsl(var(--primary) / 0.2)',
                }}
              >
                {/* Role & Company */}
                <div className={`flex items-start gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-secondary font-medium">{exp.company}</p>
                  </div>
                </div>

                {/* Date */}
                <div className={`flex items-center gap-2 text-muted-foreground text-sm mb-4 ${
                  index % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  <Calendar className="w-4 h-4" />
                  {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                </div>

                {/* Responsibilities */}
                <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  {exp.responsibilities.slice(0, 2).map((resp, i) => (
                    <motion.li
                      key={i}
                      className="text-muted-foreground text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <span className="text-primary mr-2">→</span>
                      {resp}
                    </motion.li>
                  ))}
                </ul>

                {/* View Details Button */}
                <motion.button
                  onClick={() => setSelectedExp(exp)}
                  className={`flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium ${
                    index % 2 === 0 ? 'md:ml-auto' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Education & Certifications Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Tab Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-card/50 backdrop-blur-sm rounded-full p-1 border border-border/50">
              <button
                onClick={() => setActiveTab('education')}
                className={`px-6 py-3 rounded-full font-display font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'education'
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Education & Schooling
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`px-6 py-3 rounded-full font-display font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'certifications'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Award className="w-4 h-4" />
                Certifications
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'education' ? (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="font-display text-4xl md:text-5xl font-bold text-center mb-6"
                >
                  <span className="text-neon-glow">Education</span>{' '}
                  <span className="text-foreground">& Schooling</span>
                </motion.h2>

                <motion.p
                  className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
                >
                  The foundation of my tech journey. Where it all started! 🎓
                </motion.p>

                {/* Education Timeline */}
                <div className="relative">
                  <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary to-primary md:-translate-x-1/2" />

                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.institution}
                      className={`relative mb-12 md:mb-16 ${
                        index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                      }`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 md:-translate-x-1/2 top-1"
                        whileInView={{
                          boxShadow: [
                            '0 0 0 0 hsl(var(--accent) / 0.5)',
                            '0 0 0 10px hsl(var(--accent) / 0)',
                          ],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />

                      <motion.div
                        className={`card-neon p-6 ml-8 md:ml-0 ${
                          index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                        }`}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 0 30px hsl(var(--accent) / 0.2)',
                        }}
                      >
                        <div className={`flex items-start gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <GraduationCap className="w-5 h-5 text-accent" />
                          </div>
                          <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                            <h3 className="font-display text-lg font-bold text-foreground">
                              {edu.degree}
                            </h3>
                            <p className="text-accent font-medium">{edu.institution}</p>
                          </div>
                        </div>

                        <div className={`flex items-center gap-2 text-muted-foreground text-sm mb-4 ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {edu.date}
                        </div>

                        <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          {edu.highlights.slice(0, 2).map((highlight, i) => (
                            <motion.li
                              key={i}
                              className="text-muted-foreground text-sm"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + i * 0.1 }}
                            >
                              <span className="text-accent mr-2">→</span>
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>

                        {/* View Details Button */}
                        <motion.button
                          onClick={() => setSelectedEdu(edu)}
                          className={`flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium ${
                            index % 2 === 0 ? 'md:ml-auto' : ''
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="font-display text-4xl md:text-5xl font-bold text-center mb-6"
                >
                  <span className="text-neon-glow">Professional</span>{' '}
                  <span className="text-foreground">Certifications</span>
                </motion.h2>

                <motion.p
                  className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
                >
                  Credentials that validate my expertise. Always leveling up! 🏆
                </motion.p>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert._id}
                      className="card-neon p-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 30px hsl(var(--primary) / 0.2)',
                      }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ 
                            background: cert.gradient || 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)'
                          }}
                        >
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-foreground">
                            {cert.title}
                          </h3>
                          <p className="text-primary font-medium">{cert.issuer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </div>
                        {cert.credentialId && (
                          <div className="text-xs bg-primary/10 px-2 py-1 rounded-full text-primary">
                            ID: {cert.credentialId}
                          </div>
                        )}
                      </div>

                      {cert.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {cert.description}
                        </p>
                      )}

                      {/* View Certificate Button */}
                      <motion.button
                        onClick={() => setSelectedCert(cert)}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Eye className="w-4 h-4" />
                        View Certificate
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExp && (
          <ExperienceModal 
            exp={selectedExp} 
            onClose={() => setSelectedExp(null)} 
          />
        )}
      </AnimatePresence>

      {/* Education Modal */}
      <AnimatePresence>
        {selectedEdu && (
          <EducationModal 
            edu={selectedEdu} 
            onClose={() => setSelectedEdu(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
