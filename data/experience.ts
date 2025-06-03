export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechNova Solutions",
    location: "San Francisco, CA",
    period: "Jan 2022 - Present",
    description: [
      "Lead the development of enterprise-level web applications using Next.js and TypeScript.",
      "Implemented CI/CD pipelines that reduced deployment time by 40%.",
      "Mentored junior developers and conducted code reviews to maintain high code quality.",
      "Collaborated with UX/UI designers to implement responsive and accessible interfaces."
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Innovators Inc.",
    location: "New York, NY",
    period: "Mar 2020 - Dec 2021",
    description: [
      "Developed and maintained multiple React-based web applications for clients.",
      "Created reusable component libraries that improved development efficiency by 30%.",
      "Optimized application performance, resulting in 50% faster load times.",
      "Integrated REST and GraphQL APIs for data fetching and state management."
    ],
    technologies: ["React", "JavaScript", "Redux", "SASS", "GraphQL", "Jest"]
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "CreativeTech Studios",
    location: "Austin, TX",
    period: "Jun 2018 - Feb 2020",
    description: [
      "Built responsive websites for clients across various industries.",
      "Collaborated with the design team to implement pixel-perfect UIs.",
      "Maintained and updated legacy applications.",
      "Participated in daily standups and sprint planning sessions."
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "PHP"]
  },
  {
    id: 4,
    title: "Web Development Intern",
    company: "StartUp Hub",
    location: "Remote",
    period: "Jan 2018 - May 2018",
    description: [
      "Assisted in the development of web applications under senior developer guidance.",
      "Implemented responsive layouts and UI components.",
      "Fixed bugs and optimized existing code.",
      "Participated in code reviews to improve coding skills."
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"]
  }
];