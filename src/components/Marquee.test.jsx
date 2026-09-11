import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Marquee from './Marquee';

describe('Marquee', () => {
  it('lists each technology (duplicated for the seamless loop)', () => {
    render(<Marquee />);
    expect(screen.getAllByText('Node.js')).toHaveLength(2);
    expect(screen.getAllByText('MongoDB')).toHaveLength(2);
  });
});
