import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GridBackground from '@/components/GridBackground';
import AnimatedNavbar from '@/components/AnimatedNavbar';
import SocialCircle from '@/components/SocialCircle';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import IntroAnimation from '@/components/IntroAnimation';

const Index = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('introSeen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setIntroComplete(true);
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GridBackground>
          <AnimatedNavbar />
          
          {/* Theme Switcher - Left Side */}
          <div className="fixed bottom-8 left-8 z-50">
            <ThemeSwitcher />
          </div>
          
          {/* Social Circle - Right Side */}
          <div className="fixed bottom-8 right-8 z-50">
            <SocialCircle />
          </div>
          
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </GridBackground>
      </motion.div>
    </>
  );
};

export default Index;
