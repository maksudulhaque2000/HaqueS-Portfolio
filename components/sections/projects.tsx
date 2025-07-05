'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { ProjectCard } from '@/components/ui/project-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category?: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  default_branch: string;
  full_name: string;
}

const GITHUB_USERNAME = 'maksudulhaque2000';
const FEATURED_STARS_THRESHOLD = 5;
const PROJECTS_PER_PAGE = 6;
const PLACEHOLDER_BASE_URL = 'https://via.placeholder.com/';
const LOCAL_FALLBACK_IMAGE = '/server.png';

const formatRepoName = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Projects() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
  ];

  useEffect(() => {
    setMounted(true);

    const fetchGitHubProjects = async () => {
      setLoading(true);
      setError(null);
      const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const headers: HeadersInit = {};
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
          { headers }
        );
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }
        const repos: GitHubRepo[] = await response.json();
        const fetchedProjectsData: Project[] = await Promise.all(
          repos.map(async (repo) => {
            let imageUrl = `${PLACEHOLDER_BASE_URL}400x225.png?text=${encodeURIComponent(formatRepoName(repo.name))}`;
            try {
              const readmeApiResponse = await fetch(
                `https://api.github.com/repos/${repo.full_name}/readme`,
                { headers }
              );
              if (readmeApiResponse.ok) {
                const readmeData = await readmeApiResponse.json();
                if (readmeData.content) {
                  const readmeContentDecoded = atob(readmeData.content);
                  const htmlImageRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/i;
                  const htmlMatch = readmeContentDecoded.match(htmlImageRegex);
                  if (htmlMatch && htmlMatch[1]) {
                    let foundUrl = htmlMatch[1].trim();
                    if (foundUrl.startsWith('./')) foundUrl = foundUrl.substring(2);
                    if (!foundUrl.startsWith('http://') && !foundUrl.startsWith('https://') && !foundUrl.startsWith('data:')) {
                      imageUrl = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${foundUrl}`;
                    } else {
                      imageUrl = foundUrl;
                    }
                  } else {
                    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
                    const markdownMatch = readmeContentDecoded.match(markdownImageRegex);
                    if (markdownMatch && markdownMatch[1]) {
                      let foundUrl = markdownMatch[1].trim();
                      if (foundUrl.startsWith('./')) foundUrl = foundUrl.substring(2);
                      if (!foundUrl.startsWith('http://') && !foundUrl.startsWith('https://') && !foundUrl.startsWith('data:')) {
                        imageUrl = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${foundUrl}`;
                      } else {
                        imageUrl = foundUrl;
                      }
                    }
                  }
                }
              }
            } catch (readmeError) {
              console.warn(`Could not fetch or parse README for ${repo.name}:`, readmeError);
            }

            if (imageUrl.startsWith(PLACEHOLDER_BASE_URL)) {
              imageUrl = LOCAL_FALLBACK_IMAGE;
            }

            let category: Project['category'] | undefined = undefined; 
            const repoTopics = repo.topics.map(t => t.toLowerCase());
            
            if (repoTopics.includes('fullstack')) {
              category = 'fullstack';
            } else if (repoTopics.includes('backend')) {
              category = 'backend';
            } else if (repoTopics.includes('frontend')) {
              category = 'frontend';
            } else if (repoTopics.includes('mobile')) {
              category = 'mobile';
            }
            
            const technologies = Array.from(new Set([
              ...(repo.language ? [repo.language] : []),
              ...repo.topics
            ])).filter(Boolean);
            
            const featured = repoTopics.includes('featured') || repo.stargazers_count > FEATURED_STARS_THRESHOLD;
            
            return {
              id: repo.id,
              title: formatRepoName(repo.name),
              description: repo.description || 'No description available for this project.',
              image: imageUrl,
              technologies: technologies,
              category: category,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              featured: featured,
            };
          })
        );
        setProjects(fetchedProjectsData);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch projects from GitHub:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory]);

  const filteredProjects = currentCategory === 'all'
    ? projects
    : projects.filter(project => project.category === currentCategory);

  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjectsToDisplay = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      const projectSection = document.getElementById('projects');
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work and the technologies I've been working with"
        />
        <div className="mt-12">
          <Tabs defaultValue="all" onValueChange={(value) => setCurrentCategory(value)} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className={`grid grid-cols-2 md:grid-cols-${Math.min(categories.length, 4)}`}>
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    className="text-sm md:text-base"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value={currentCategory} className="mt-0">
              {loading && <p className="text-center py-8">Loading projects from GitHub...</p>}
              {error && <p className="text-center py-8 text-red-500">Error: {error}</p>}
              {!loading && !error && filteredProjects.length === 0 && (
                <p className="text-center py-8">No projects found for &quot;{categories.find(c => c.value === currentCategory)?.label}&quot; category.</p>
              )}
              {!loading && !error && currentProjectsToDisplay.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProjectsToDisplay.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      inView={sectionInView}
                    />
                  ))}
                </div>
              )}
              {!loading && !error && totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
                  <Button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <Button
                      key={number}
                      onClick={() => paginate(number)}
                      variant={currentPage === number ? "default" : "outline"}
                      size="sm"
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      {number}
                    </Button>
                  ))}
                  <Button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}