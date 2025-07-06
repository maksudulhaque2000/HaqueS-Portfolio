'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navItems = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Resume', href: '#resume', id: 'resume' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

type HeaderProps = {
  onNavClick?: (tab: string, sectionId: string) => void;
};

export default function Header({ onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px] flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tight hover:text-primary/90 transition-colors"
        >
          Maksudul<span className="text-primary"> Haque</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 relative">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (onNavClick) {
                  onNavClick(item.name.toLowerCase(), item.id);
                } else {
                  const section = document.getElementById(item.id);
                  section?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              {item.name}
            </button>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-md md:hidden z-50">
          <nav className="flex flex-col items-center py-6 gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (onNavClick) {
                    onNavClick(item.name.toLowerCase(), item.id);
                  } else {
                    const section = document.getElementById(item.id);
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
                className="text-base font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
