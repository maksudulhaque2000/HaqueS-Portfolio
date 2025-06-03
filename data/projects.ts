export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product listings, cart functionality, user authentication, and payment integration.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    category: "fullstack",
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.example.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productive task management application with drag-and-drop functionality, task categorization, and progress tracking.",
    image: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "frontend",
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://task-manager.example.com",
    featured: true
  },
  {
    id: 3,
    title: "Real-Time Chat Application",
    description: "A messaging platform with real-time communication, user status indicators, and media sharing capabilities.",
    image: "https://images.pexels.com/photos/7350903/pexels-photo-7350903.jpeg",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    category: "fullstack",
    githubUrl: "https://github.com/username/chat-app",
    featured: false
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "An interactive weather application displaying current conditions and forecasts using data visualization.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
    category: "frontend",
    githubUrl: "https://github.com/username/weather-dashboard",
    liveUrl: "https://weather.example.com",
    featured: false
  },
  {
    id: 5,
    title: "Fitness Tracker API",
    description: "A robust backend service for fitness applications, handling workout tracking, user progress, and nutrition data.",
    image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "GraphQL"],
    category: "backend",
    githubUrl: "https://github.com/username/fitness-api",
    featured: false
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "A responsive developer portfolio showcasing projects and skills with a modern, clean design.",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio.example.com",
    featured: true
  }
];