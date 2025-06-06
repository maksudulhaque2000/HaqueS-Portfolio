'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion-wrapper';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  achievements: string[];
  certificate: string | undefined;
}

const educationData: Education[] = [
   {
    id: 1,
    degree: "Honours 3rd Year (Accounting)",
    institution: "Demra University College - DUC",
    duration: "2021-2022", // Consider changing to "2021-Present" or expected graduation year if still ongoing
    description: "Currently pursuing a Bachelor of Honours degree in Accounting. Core areas of study include financial accounting, cost accounting, taxation, and auditing standards.",
    achievements: [
      "Consistently maintained a strong academic record.",
      "Actively participated in departmental seminars and workshops related to finance and accounting.",
      "Developed strong analytical and problem-solving skills through coursework and case studies."
    ],
    certificate: undefined,
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Dania University College",
    duration: "2020",
    description: "Completed Higher Secondary Certificate (HSC) with a major in Business Studies, gaining foundational knowledge in accounting, finance, management, and economics.",
    achievements: [
      "GPA: 3.92/5.00"
    ],
    certificate: 'HSC Certificate.pdf',
  },
  {
    id: 3,
    degree: "Secondary School Certificate (SSC)",
    institution: "Barnomala Adarsha High School",
    duration: "2018",
    description: "Successfully completed Secondary School Certificate (SSC) with a major in the Science stream, establishing a strong educational base in mathematics, physics, chemistry, and biology.",
    achievements: [
      "GPA: 3.67/5.00"
    ],
    certificate: 'SSC Certificate.pdf',
  }
];

export default function Education() {
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
    <section id="education" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="Education"
          subtitle="My academic background and qualifications"
        />

        <div ref={ref} className="grid grid-cols-1 gap-6 mt-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                    <Badge variant="secondary" className="w-fit">
                    {edu.duration}
                  </Badge>
                </div>
                
                <p className="mt-4 text-muted-foreground">
                  {edu.description}
                </p>

                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                <div className='flex justify-end'>
                    <a  href={`/${edu?.certificate}`} target="_blank" rel="noopener noreferrer" className='flex gap-2 items-center justify-between bg-slate-600 p-2 rounded'>
                    Certificate <Award />
                    </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}