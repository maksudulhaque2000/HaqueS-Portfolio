'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/contact';

export default function Home() {
  const [activeResumeTab, setActiveResumeTab] = useState('experience');

  const handleNavClick = (tab: string, sectionId: string) => {
    setActiveResumeTab(tab);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header onNavClick={handleNavClick} />
      <div className="w-full max-w-[1400px] mx-auto">
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume 
            activeTab={activeResumeTab} 
            onTabChange={setActiveResumeTab} 
          />
          <Contact />
        </main>
      </div>
    </>
  );
}