import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';
import { skillGroups } from '../data/profile';

describe('Skills', () => {
  it('renders every skill group title', () => {
    render(<Skills />);
    for (const g of skillGroups) expect(screen.getByText(g.title)).toBeInTheDocument();
  });
});
