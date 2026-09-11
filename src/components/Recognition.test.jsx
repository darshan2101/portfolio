import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Recognition from './Recognition';
import { recognition } from '../data/profile';

describe('Recognition', () => {
  it('renders the featured award and every showcase', () => {
    render(<Recognition />);
    for (const r of recognition) expect(screen.getByText(r.event)).toBeInTheDocument();
    expect(screen.getByText('world').tagName).toBe('EM');
  });
});
