import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';
import { profile } from '../data/profile';

describe('Hero', () => {
  it('renders the name as the page heading and the two calls to action', () => {
    render(<Hero tier="high" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name);
    expect(screen.getByRole('link', { name: /explore work/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', profile.resumeUrl);
  });

  it('shows the static photo only when the 3D tier is off', () => {
    const { rerender } = render(<Hero tier="high" />);
    expect(screen.queryAllByRole('img')).toHaveLength(0);
    rerender(<Hero tier="off" />);
    expect(screen.getAllByAltText(profile.name).length).toBeGreaterThan(0);
  });
});
