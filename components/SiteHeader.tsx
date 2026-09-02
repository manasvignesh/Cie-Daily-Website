'use client';
/* eslint-disable next/no-img-element */

import Link from 'next/link';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  ['Discover', '/'],
  ['Quick Briefs', '/briefs'],
  ['Full Stories', '/stories'],
  ['Startups', '/startups'],
  ['Tech', '/technology'],
  ['AI & ML', '/ai-and-ml'],
  ['Engineering', '/engineering'],
  ['India', '/india'],
  ['Spaces', '/spaces'],
];

export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="CIE Daily home">
      <img src="/cie-mascot.png" alt="CIE Daily, winking paper mascot" />
    </Link>
  );
}

export function SiteHeader({ activePath = '/' }: { activePath?: string }) {
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' &&
    localStorage.getItem('cie-theme') === 'dark',
  );
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('cie-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <>
      <div className="ticker">
        <span>THE INTERNET, EXPLAINED DAILY</span>
        <p>
          {new Intl.DateTimeFormat('en-IN', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          }).format(new Date())}
        </p>
        <span>INDIA · LIVE</span>
      </div>
      <header className="site-header">
        <Wordmark />
        <nav
          className={menuOpen ? 'nav open' : 'nav'}
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => (
            <Link
              className={activePath === href ? 'active' : ''}
              href={href}
              key={label}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search">
            <Search size={19} />
          </button>
          <button
            className="icon-button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="join-button">
            Join <span>CIE</span>
          </button>
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
          >
            <Menu />
          </button>
        </div>
      </header>
    </>
  );
}
