'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion-wrapper';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { experience } from '@/data/experience';

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <SectionTitle 
          title="Work Experience" 
          subtitle="My professional journey and roles in the tech industry"
        />

        <div ref={ref} className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -ml-px"></div>
          
          <div className="space-y-16">
            {experience.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                inView={inView}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  item: (typeof experience)[0];
  index: number;
  inView: boolean;
  isEven: boolean;
}

function TimelineItem({ item, index, inView, isEven }: TimelineItemProps) {
  const { title, company, location, period, description, technologies } = item;
  
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -ml-1.5 top-7 z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.7, delay: 0.1 * index }}
        className={`
          relative md:w-1/2 
          ${isEven ? 'ml-12 md:ml-0 md:pr-12' : 'ml-12 md:ml-auto md:pl-12'}
        `}
      >
        <Card className="p-6 border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground">{company} • {location}</p>
            </div>
            <p className="text-sm font-medium text-primary mt-1 md:mt-0 md:text-right">{period}</p>
          </div>

          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            {description.map((item, i) => (
              <li key={i} className="text-sm md:text-base">{item}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}