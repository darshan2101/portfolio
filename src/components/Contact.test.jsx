import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from './Contact';
import { profile } from '../data/profile';

describe('Contact', () => {
  it('offers email, LinkedIn, and GitHub', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /say hello/i })).toHaveAttribute('href', `mailto:${profile.email}`);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', profile.linkedin);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', profile.github);
    expect(screen.getByText('extraordinary').tagName).toBe('EM');
  });
});
