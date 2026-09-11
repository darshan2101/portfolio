import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Experience from './Experience';
import { experience } from '../data/profile';

describe('Experience', () => {
  it('renders each role and company', () => {
    render(<Experience />);
    for (const e of experience) {
      expect(screen.getByText(e.role)).toBeInTheDocument();
      expect(screen.getByText(e.company)).toBeInTheDocument();
    }
  });
});
