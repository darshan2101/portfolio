import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TiltCard from './TiltCard';

describe('TiltCard', () => {
  it('renders children inside a glass card and survives pointer movement', () => {
    render(
      <TiltCard data-testid="card">
        <p>content</p>
      </TiltCard>
    );
    const card = screen.getByTestId('card');
    expect(card.className).toContain('glass-soft');
    fireEvent.pointerMove(card, { clientX: 10, clientY: 10 });
    fireEvent.pointerLeave(card);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
