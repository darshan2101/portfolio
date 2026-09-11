import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from './Projects';
import { featuredProjects } from '../data/profile';

describe('Projects', () => {
  it('renders every featured project with a numbered index', () => {
    render(<Projects />);
    for (const p of featuredProjects) expect(screen.getByText(p.title)).toBeInTheDocument();
    expect(screen.getByText(`01 / 0${featuredProjects.length}`)).toBeInTheDocument();
  });
  it('links the open-source project to GitHub', () => {
    render(<Projects />);
    const link = screen.getByRole('link', { name: /view on github/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'));
  });
});
