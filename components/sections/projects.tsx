'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/data/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
  ];

  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(project => project.category === category);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work and the technologies I've been working with"
        />

        <div ref={ref} className="mt-12">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className="text-sm md:text-base"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}