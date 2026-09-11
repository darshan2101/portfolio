import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionHeading, { splitAccent } from './SectionHeading';

describe('splitAccent', () => {
  it('splits a single *accent* word out of the title', () => {
    expect(splitAccent('Work on the *world* stage')).toEqual([
      { text: 'Work on the ', accent: false },
      { text: 'world', accent: true },
      { text: ' stage', accent: false },
    ]);
  });

  it('returns the whole title when there is no accent', () => {
    expect(splitAccent('Plain title')).toEqual([{ text: 'Plain title', accent: false }]);
  });
});

describe('SectionHeading', () => {
  it('renders the eyebrow and an italic accent word', () => {
    render(<SectionHeading eyebrow="Recognition" title="Work on the *world* stage" />);
    expect(screen.getByText('Recognition')).toBeInTheDocument();
    const em = screen.getByText('world');
    expect(em.tagName).toBe('EM');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Work on the world stage');
  });
});
