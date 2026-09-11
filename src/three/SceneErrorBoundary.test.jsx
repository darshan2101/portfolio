import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SceneErrorBoundary from './SceneErrorBoundary';

function Boom() {
  throw new Error('gl exploded');
}

describe('SceneErrorBoundary', () => {
  it('renders the fallback when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <SceneErrorBoundary fallback={<div>static</div>}>
        <Boom />
      </SceneErrorBoundary>
    );
    expect(screen.getByText('static')).toBeInTheDocument();
    spy.mockRestore();
  });

  it('renders children when nothing throws', () => {
    render(
      <SceneErrorBoundary fallback={<div>static</div>}>
        <div>canvas</div>
      </SceneErrorBoundary>
    );
    expect(screen.getByText('canvas')).toBeInTheDocument();
  });
});
